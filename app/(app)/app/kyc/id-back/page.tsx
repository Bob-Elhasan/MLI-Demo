"use client";

import { IdCapture } from "@/components/app/id-capture";

export default function IdBack() {
  return <IdCapture side="back" step={2} next="/app/kyc/review" />;
}
