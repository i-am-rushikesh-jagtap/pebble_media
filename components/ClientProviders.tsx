"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
