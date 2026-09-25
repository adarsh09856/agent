import { useQuery } from "@tanstack/react-query";
import { Monitor, X } from "lucide-react";
import { useState } from "react";

interface DemoModeStatus {
  enabled: boolean;
  message: string;
}

export function DemoModeBanner() {
  return null;
}

export function useDemoMode() {
  return {
    isDemoMode: false,
    message: "",
  };
}
