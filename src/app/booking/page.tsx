import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Reserve Your Stay",
  description:
    "Compose your escape to AURELIA — choose your dates, your residence and the experiences that will shape your days on Maré Séraphine. A quiet, considered reservation, in six steps.",
};

function WizardFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="h-px w-16 animate-pulse bg-gold/60" />
        <p className="eyebrow text-gold">Preparing your reservation</p>
        <p className="font-serif text-2xl font-light text-sand/70">
          One moment, please.
        </p>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<WizardFallback />}>
      <BookingWizard />
    </Suspense>
  );
}
