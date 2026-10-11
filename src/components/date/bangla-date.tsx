"use client";

import { useSyncExternalStore } from "react";

interface BanglaDateProps {
  className?: string;
}

export function formatBanglaDate(date: Date = new Date()): string {
  return date.toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
}

const emptySubscribe = () => () => {};

let cachedClientDate: string | null = null;
function getClientSnapshot(): string {
  if (cachedClientDate === null) {
    cachedClientDate = formatBanglaDate(new Date());
  }
  return cachedClientDate;
}

function getServerSnapshot(): string {
  return "";
}

export default function BanglaDate({ className }: BanglaDateProps) {
  const date = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  return (
    <p className={className} suppressHydrationWarning>
      {date}
    </p>
  );
}
