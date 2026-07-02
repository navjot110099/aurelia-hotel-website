import type { Metadata } from "next";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export const metadata: Metadata = {
  title: "Estate Console",
  description:
    "AURELIA back-office — reservations, occupancy, revenue and estate operations for Maré Séraphine.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
