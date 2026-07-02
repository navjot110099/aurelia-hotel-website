import type { Metadata } from "next";
import { GuestDashboard } from "@/components/dashboard/GuestDashboard";

export const metadata: Metadata = {
  title: "My Journey",
  description:
    "Your private AURELIA journey — upcoming stays, past voyages, invoices, rewards and the experiences you have saved on Maré Séraphine.",
  robots: { index: false, follow: false },
};

export default function GuestPage() {
  return <GuestDashboard />;
}
