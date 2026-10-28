"use client";

import { IdCapture } from "@/components/app/id-capture";

export default function IdFront() {
  return <IdCapture side="front" step={1} next="/app/kyc/id-back" />;
}
