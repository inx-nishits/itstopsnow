"use client";

import { useCallback, useState } from "react";
import {
  type GetInvolvedFieldErrors,
  type GetInvolvedPayload,
  validateGetInvolvedFields,
} from "@/lib/getInvolved/schema";
import { submitGetInvolved } from "@/lib/getInvolved/submitGetInvolved";

const INITIAL_VALUES: GetInvolvedPayload = {
  name: "",
  email: "",
  role: "",
  phone: "",
  message: "",
};

export type GetInvolvedFormStatus = "idle" | "loading" | "success" | "error";

export function useGetInvolvedForm() {
  const [values, setValues] = useState<GetInvolvedPayload>(INITIAL_VALUES);
  const [fieldErrors, setFieldErrors] = useState<GetInvolvedFieldErrors>({});
  const [status, setStatus] = useState<GetInvolvedFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const setField = useCallback(
    (field: keyof GetInvolvedPayload, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setFieldErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
      if (status === "error") {
        setStatus("idle");
        setErrorMessage("");
      }
    },
    [status]
  );

  const reset = useCallback(() => {
    setValues(INITIAL_VALUES);
    setFieldErrors({});
    setStatus("idle");
    setErrorMessage("");
  }, []);

  const submit = useCallback(async () => {
    const errors = validateGetInvolvedFields(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setErrorMessage("Please check the highlighted fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    setFieldErrors({});

    const result = await submitGetInvolved(values);

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.error);
      if (result.fieldErrors) {
        setFieldErrors(result.fieldErrors);
      }
      return;
    }

    setStatus("success");
  }, [values]);

  return {
    values,
    fieldErrors,
    status,
    errorMessage,
    setField,
    reset,
    submit,
    isLoading: status === "loading",
    isSuccess: status === "success",
  };
}
