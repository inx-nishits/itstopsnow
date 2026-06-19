"use client";

import { useState, useCallback } from "react";
import { simulateSubmit, validateEmail } from "@/lib/mock/utils";

export function useNewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const subscribe = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      setError("");

      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      setIsSubscribing(true);
      await simulateSubmit();
      setIsSubscribing(false);
      setIsSubscribed(true);
    },
    [email]
  );

  const reset = useCallback(() => {
    setEmail("");
    setIsSubscribed(false);
    setError("");
  }, []);

  return { email, setEmail, isSubscribing, isSubscribed, error, subscribe, reset };
}
