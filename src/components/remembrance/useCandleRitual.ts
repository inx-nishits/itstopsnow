"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { cumulativeGrayscale } from "@/lib/candleGrayscale";

const STORAGE_PREFIX = "isn_lit_candle_";
const BLOOM_HOLD_MS = 2500;
const BLOOM_PEAK_GLOW = 0.28;

interface UseCandleRitualOptions {
  memorialId: string;
  storageKey?: string;
  initialCount: number;
}

export function useCandleRitual({ memorialId, storageKey, initialCount }: UseCandleRitualOptions) {
  const storageId = storageKey ?? memorialId;
  const prefersReducedMotion = useReducedMotion();
  const [candleCount, setCandleCount] = useState(initialCount);
  const [isLit, setIsLit] = useState(false);
  const [portraitGrayscale, setPortraitGrayscale] = useState(() =>
    cumulativeGrayscale(initialCount)
  );
  const [portraitScale, setPortraitScale] = useState(1);
  const [warmGlowOpacity, setWarmGlowOpacity] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const animControls = useRef<ReturnType<typeof animate> | null>(null);

  const cumulativeGray = cumulativeGrayscale(candleCount);

  useEffect(() => {
    const lit = localStorage.getItem(`${STORAGE_PREFIX}${storageId}`);
    if (lit) setIsLit(true);
  }, [storageId]);

  useEffect(() => {
    if (isAnimating) return;
    setPortraitGrayscale(cumulativeGray);
    setWarmGlowOpacity(0);
  }, [cumulativeGray, isAnimating]);

  const runBloomSequence = useCallback(
    async (startGray: number, settleGray: number) => {
      setIsAnimating(true);
      animControls.current?.stop();

      if (prefersReducedMotion) {
        setWarmGlowOpacity(BLOOM_PEAK_GLOW);
        setPortraitGrayscale(0);
        setPortraitScale(1.01);
        await new Promise((r) => setTimeout(r, 400));
        setPortraitGrayscale(settleGray);
        setPortraitScale(1);
        setWarmGlowOpacity(0);
        setIsAnimating(false);
        return;
      }

      setWarmGlowOpacity(0);
      const glowIn = animate(0, BLOOM_PEAK_GLOW, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: setWarmGlowOpacity,
      });
      animControls.current = animate(startGray, 0, {
        duration: 5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: setPortraitGrayscale,
      });
      const scaleUp = animate(1, 1.02, {
        duration: 5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: setPortraitScale,
      });

      await Promise.all([animControls.current, glowIn, scaleUp]);
      await new Promise((r) => setTimeout(r, BLOOM_HOLD_MS));

      animControls.current = animate(0, settleGray, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate: setPortraitGrayscale,
      });
      const glowSettle = animate(BLOOM_PEAK_GLOW, 0, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate: setWarmGlowOpacity,
      });
      const scaleDown = animate(1.02, 1, {
        duration: 2.2,
        ease: "easeOut",
        onUpdate: setPortraitScale,
      });

      await Promise.all([animControls.current, glowSettle, scaleDown]);
      setIsAnimating(false);
    },
    [prefersReducedMotion]
  );

  const lightCandle = useCallback(async () => {
    if (loading || isAnimating) return;
    if (isLit) {
      setMessage("You have already lit a candle here.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      let deviceId = localStorage.getItem("device_id");
      if (!deviceId) {
        deviceId = Math.random().toString(36).substring(2);
        localStorage.setItem("device_id", deviceId);
      }

      if (localStorage.getItem(`${STORAGE_PREFIX}${storageId}`)) {
        setIsLit(true);
        setMessage("You have already lit a candle here.");
        setLoading(false);
        return;
      }

      const startGray = cumulativeGrayscale(candleCount);
      const nextCount = candleCount + 1;
      const settleGray = cumulativeGrayscale(nextCount);

      try {
        const res = await fetch("/api/candle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ memorialId, userIdentifier: deviceId }),
        });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to light candle.");
        }
      } catch (apiError) {
        console.warn("Candle API unavailable, continuing locally.", apiError);
      }

      localStorage.setItem(`${STORAGE_PREFIX}${storageId}`, "true");
      setIsLit(true);
      setCandleCount(nextCount);
      setMessage(
        `Your candle joins ${nextCount.toLocaleString()} others remembering them. Every light restores their portrait for everyone.`
      );

      await runBloomSequence(startGray, settleGray);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Failed to light candle.";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }, [isLit, loading, isAnimating, memorialId, storageId, candleCount, runBloomSequence]);

  useEffect(() => {
    return () => animControls.current?.stop();
  }, []);

  return {
    candleCount,
    isLit,
    portraitGrayscale,
    portraitScale,
    warmGlowOpacity,
    loading,
    message,
    isAnimating,
    cumulativeGray,
    lightCandle,
  };
}
