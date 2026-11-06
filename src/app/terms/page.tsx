import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms governing reservations, deposits, cancellations and stays at AURELIA — the private-island reserve on Maré Séraphine.",
};

const SECTIONS = [
  { id: "agreement", title: "Agreement" },
  { id: "reservations", title: "Reservations" },
  { id: "rates", title: "Rates & Charges" },
  { id: "deposits", title: "Deposits & Payment" },
  { id: "cancellation", title: "Cancellation & Modification" },
  { id: "check-in", title: "Arrival & Departure" },
  { id: "conduct", title: "Guest Conduct" },
  { id: "children", title: "Children & Occupancy" },
  { id: "liability", title: "Liability" },
  { id: "force-majeure", title: "Force Majeure" },
  { id: "privacy", title: "Privacy" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact" },
] as const;

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-serif text-lg text-gold/70">
          {String(index).padStart(2, "0")}
        </span>
        <h2 className="font-serif text-3xl font-light leading-tight text-sand md:text-4xl">
          {title}
        </h2>
      </div>
      <div className="space-y-4 font-sans text-[15px] font-light leading-relaxed text-sand/70 [&_a]:text-gold [&_a]:underline [&_a]:decoration-gold/40 [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-normal [&_strong]:text-sand">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="vignette relative overflow-hidden">
      <header className="relative px-6 pt-40 md:px-10">
        <div className="mx-auto max-w-editorial">
          <p className="eyebrow mb-6 text-gold">Legal · Terms</p>
          <h1 className="font-serif text-5xl font-light leading-[1.02] tracking-[-0.01em] text-sand md:text-7xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-sand/60">
            These terms govern your reservation and stay at {BRAND.legalName}.
            Please read them with care — making a reservation constitutes your
            acceptance of the conditions set out below.
          </p>
          <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-sand/40">
            Last updated · 1 January 2026
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-editorial px-6 py-24 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <p className="eyebrow mb-6 text-sand/40">On this page</p>
            <nav className="flex flex-col gap-3">
              {SECTIONS.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-baseline gap-3 font-sans text-[13px] font-light text-sand/55 transition-colors hover:text-gold"
                >
                  <span className="font-serif text-xs text-gold/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="link-sweep">{s.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          <div className="max-w-2xl space-y-16">
            <Section id="agreement" index={1} title="Agreement">
              <p>
                These Terms &amp; Conditions constitute the agreement between the
                guest (&ldquo;you&rdquo;) and {BRAND.legalName} (&ldquo;AURELIA&rdquo;,
                &ldquo;we&rdquo; or &ldquo;us&rdquo;). They apply to all
                reservations, stays and use of our facilities and services on Maré
                Séraphine. Where a reservation is made on behalf of others, the
                person making it warrants that they have authority to accept these
                terms for all members of the party.
              </p>
            </Section>

            <Section id="reservations" index={2} title="Reservations">
              <p>
                A reservation is confirmed only upon our written confirmation and
                receipt of the required deposit. All reservations are subject to
                availability. We reserve the right to decline or cancel any
                reservation at our discretion, in which case any sums paid will be
                refunded in full. Reservations are personal to the named guest and
                may not be transferred, sublet or resold without our written consent.
              </p>
            </Section>

            <Section id="rates" index={3} title="Rates & Charges">
              <p>
                Rates are quoted per residence, per night, in United States dollars
                unless otherwise stated, and are exclusive of applicable government
                taxes, tourism levies and service charges, which will be itemised on
                your confirmation. Rates include the inclusions specified for each
                residence; dining, spa treatments, curated experiences and other
                incidentals are charged as enjoyed and settled on departure.
              </p>
            </Section>

            <Section id="deposits" index={4} title="Deposits & Payment">
              <p>
                A deposit of <strong>fifty percent (50%)</strong> of the total
                accommodation charge is due at the time of booking to confirm your
                reservation. The <strong>remaining balance</strong> is due{" "}
                <strong>sixty (60) days</strong> prior to arrival. For reservations
                made within sixty days of arrival, the full amount is payable at the
                time of booking.
              </p>
              <p>
                For full-island buyouts, festive-season stays and The Celestia
                Residence, a non-refundable deposit and bespoke payment schedule
                apply, as set out in your individual confirmation. We accept major
                credit cards and bank transfer; an incidentals authorisation is taken
                on arrival.
              </p>
            </Section>

            <Section id="cancellation" index={5} title="Cancellation & Modification">
              <p>
                Cancellations and date changes must be requested in writing. The
                following schedule applies to standard reservations, calculated from
                the scheduled arrival date:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>60 days or more</strong> — full refund of the deposit,
                  less a processing fee.
                </li>
                <li>
                  <strong>30 to 59 days</strong> — forfeiture of the deposit (50% of
                  the accommodation charge).
                </li>
                <li>
                  <strong>15 to 29 days</strong> — a charge equal to seventy-five
                  percent (75%) of the accommodation charge.
                </li>
                <li>
                  <strong>14 days or fewer, no-show, or early departure</strong> —
                  a charge equal to one hundred percent (100%) of the accommodation
                  charge.
                </li>
              </ul>
              <p>
                Festive-season stays, full-island buyouts and The Celestia Residence
                are subject to a stricter, non-refundable schedule detailed in your
                confirmation. We strongly recommend comprehensive travel insurance.
              </p>
            </Section>

            <Section id="check-in" index={6} title="Arrival & Departure">
              <p>
                Check-in is from 14:00 and check-out is by 12:00. Given the
                remoteness of the reserve, all arrivals and departures are
                coordinated with your scheduled seaplane or helicopter transfer;
                please liaise with our concierge to confirm timings. Early check-in
                and late check-out may be arranged subject to availability and may
                incur a charge. A valid government-issued identity document is
                required for each guest on arrival.
              </p>
            </Section>

            <Section id="conduct" index={7} title="Guest Conduct">
              <p>
                We ask that all guests conduct themselves with consideration for
                other guests, our staff, the estate and the surrounding marine
                environment. Smoking is permitted only in designated areas.
                Recreational drones, spearfishing and the removal of coral, shells or
                marine life are strictly prohibited within the reserve. We reserve
                the right, without refund, to decline service to, or require the
                departure of, any guest whose conduct is unlawful, endangers safety,
                or materially disturbs others or the environment. You are responsible
                for any loss or damage caused by you or your party.
              </p>
            </Section>

            <Section id="children" index={8} title="Children & Occupancy">
              <p>
                Families are warmly welcomed in our villas. Maximum occupancy for
                each residence is stated at the time of booking and may not be
                exceeded for safety and comfort. Maré and the overwater spa are
                reserved for guests aged sixteen and over after 18:00. Children must
                be supervised by a responsible adult at all times, particularly
                around water, decks and marine areas.
              </p>
            </Section>

            <Section id="liability" index={9} title="Liability">
              <p>
                To the fullest extent permitted by law, AURELIA shall not be liable
                for any loss, damage, injury or expense arising from your use of the
                reserve and its facilities, except where caused by our negligence.
                We do not exclude or limit liability for death or personal injury
                caused by our negligence, for fraud, or for any liability that cannot
                lawfully be excluded. Participation in watersports, diving, boating,
                helicopter journeys and other experiences is at your own risk and may
                be subject to separate waivers and provider terms. We accept no
                responsibility for valuables not deposited in the in-residence safe.
              </p>
            </Section>

            <Section id="force-majeure" index={10} title="Force Majeure">
              <p>
                We shall not be liable for any failure or delay in performing our
                obligations where such failure or delay results from events beyond
                our reasonable control, including but not limited to cyclones, storms,
                tsunamis, flooding, fire, epidemic or pandemic, acts of government,
                border or travel restrictions, strikes, disruption to air or sea
                transport, or acts of war or terrorism. Where such events materially
                affect your stay, we will work with you in good faith to reschedule
                or offer a credit; refunds in these circumstances are at our
                reasonable discretion and net of unrecoverable third-party costs.
              </p>
            </Section>

            <Section id="privacy" index={11} title="Privacy">
              <p>
                Your personal information is handled in accordance with our{" "}
                <Link href="/privacy">Privacy Policy</Link>, which forms part of
                these terms. By making a reservation you acknowledge the practices
                described there.
              </p>
            </Section>

            <Section id="governing-law" index={12} title="Governing Law">
              <p>
                These terms and any dispute or claim arising out of or in connection
                with them, your reservation or your stay shall be governed by and
                construed in accordance with the laws of French Polynesia. The courts
                of Papeete shall have exclusive jurisdiction, without prejudice to any
                mandatory consumer-protection rights you may have under the law of
                your country of residence.
              </p>
            </Section>

            <Section id="contact" index={13} title="Contact">
              <p>For any question regarding these terms, please contact us:</p>
              <div className="glass mt-4 rounded-2xl border border-white/10 p-6 not-italic">
                <p className="font-serif text-xl font-light text-sand">
                  {BRAND.legalName}
                </p>
                <p className="mt-2 text-sand/60">{BRAND.address}</p>
                <p className="mt-4 text-sand/60">
                  Reservations:{" "}
                  <a href={`mailto:${BRAND.reservations}`}>{BRAND.reservations}</a>
                </p>
                <p className="text-sand/60">
                  Telephone: <a href={`tel:${BRAND.phone}`}>{BRAND.phone}</a>
                </p>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
