import type { Metadata } from "next";
import { ConciergeUI } from "@/components/concierge/ConciergeUI";

export const metadata: Metadata = {
  title: "The Concierge",
  description:
    "Aurelia's AI concierge — a discreet, always-present companion for your stay. Ask about residences, dining at Maré, the overwater spa, the day's weather or how to arrive, and be answered in an instant.",
};

export default function ConciergePage() {
  return <ConciergeUI />;
}
