import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AURELIA collects, uses and safeguards the personal information of our guests — with the same discretion we extend to every stay on Maré Séraphine.",
};

const SECTIONS = [
  { id: "introduction", title: "Introduction" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "legal-bases", title: "Legal Bases for Processing" },
  { id: "sharing", title: "How We Share Information" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "retention", title: "Data Retention" },
  { id: "security", title: "How We Protect Your Data" },
  { id: "transfers", title: "International Transfers" },
  { id: "your-rights", title: "Your Rights" },
  { id: "children", title: "Children's Privacy" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contacting Us" },
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
    <section id={id} className="scroll-mt-32 border-t border-white/10 pt-12">
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

export default function PrivacyPage() {
  return (
    <main id="main" className="vignette relative overflow-hidden">
      {/* Header */}
      <header className="relative px-6 pt-40 md:px-10">
        <div className="mx-auto max-w-editorial">
          <p className="eyebrow mb-6 text-gold">Legal · Privacy</p>
          <h1 className="font-serif text-5xl font-light leading-[1.02] tracking-[-0.01em] text-sand md:text-7xl">
            Privacy Policy
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-base font-light leading-relaxed text-sand/60">
            The privacy of our guests is inseparable from the discretion of our
            hospitality. This policy explains what {BRAND.legalName} collects, why
            we collect it, and the rights you hold over your information.
          </p>
          <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-sand/40">
            Last updated · 1 January 2026
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-editorial px-6 py-24 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[240px_1fr]">
          {/* Section nav */}
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

          {/* Body */}
          <div className="max-w-2xl space-y-16">
            <Section id="introduction" index={1} title="Introduction">
              <p>
                {BRAND.legalName} (&ldquo;AURELIA&rdquo;, &ldquo;we&rdquo;,
                &ldquo;us&rdquo; or &ldquo;our&rdquo;) operates a private-island
                reserve on Maré Séraphine and the associated website, reservation
                systems and guest services. We are committed to protecting the
                personal information entrusted to us and to processing it fairly,
                lawfully and transparently.
              </p>
              <p>
                This policy applies to information we collect through our website,
                our reservations atelier, in-residence services, our concierge and
                any correspondence you have with us. By making a reservation or
                using our services, you acknowledge the practices described here.
              </p>
            </Section>

            <Section
              id="information-we-collect"
              index={2}
              title="Information We Collect"
            >
              <p>We collect the following categories of personal information:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Identity &amp; contact data</strong> — name, title, date
                  of birth, nationality, passport or identity document details,
                  postal address, email address and telephone numbers.
                </li>
                <li>
                  <strong>Reservation data</strong> — arrival and departure dates,
                  residence preferences, party composition, confirmation codes and
                  itinerary details.
                </li>
                <li>
                  <strong>Payment data</strong> — cardholder name, billing address
                  and transaction records. Full card numbers are tokenised by our
                  PCI-DSS-compliant payment processor and are not stored on our
                  systems.
                </li>
                <li>
                  <strong>Preference &amp; stay data</strong> — dietary
                  requirements, spa and dining preferences, celebration occasions,
                  accessibility needs and other details you share to personalise
                  your stay.
                </li>
                <li>
                  <strong>Sensitive data</strong> — where you volunteer health,
                  dietary or accessibility information to help us care for you, we
                  process it only with your consent and solely for that purpose.
                </li>
                <li>
                  <strong>Technical data</strong> — IP address, device and browser
                  type, and interactions with our website, collected through
                  cookies and similar technologies.
                </li>
              </ul>
            </Section>

            <Section id="how-we-use" index={3} title="How We Use Your Information">
              <p>We use your personal information to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>process and administer your reservations and transfers;</li>
                <li>
                  personalise your stay — from pillow menus to dining and
                  experiences;
                </li>
                <li>process payments, deposits and settle accounts;</li>
                <li>
                  respond to your enquiries and provide concierge and guest
                  services;
                </li>
                <li>
                  send you service communications, and — where you have consented —
                  our quiet correspondence of new journeys and seasonal menus;
                </li>
                <li>
                  comply with legal, tax, immigration and regulatory obligations;
                  and
                </li>
                <li>
                  protect the safety and security of our guests, staff and estate.
                </li>
              </ul>
            </Section>

            <Section id="legal-bases" index={4} title="Legal Bases for Processing">
              <p>
                Where the EU or French General Data Protection Regulation applies,
                we rely on the following legal bases: <strong>performance of a
                contract</strong> (to fulfil your reservation);{" "}
                <strong>legitimate interests</strong> (to operate, improve and
                secure our services in a manner you would reasonably expect);{" "}
                <strong>consent</strong> (for marketing communications and any
                sensitive data you share); and <strong>legal obligation</strong>{" "}
                (for tax, immigration and record-keeping requirements). You may
                withdraw consent at any time without affecting the lawfulness of
                prior processing.
              </p>
            </Section>

            <Section id="sharing" index={5} title="How We Share Information">
              <p>
                We do not sell your personal information. We share it only where
                necessary, with:
              </p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Service partners</strong> — seaplane, helicopter and
                  private-transfer operators, and curated experience providers, so
                  they may deliver the services you have requested;
                </li>
                <li>
                  <strong>Processors</strong> — payment, technology, analytics and
                  communications providers acting on our instructions under
                  contract;
                </li>
                <li>
                  <strong>Professional advisers &amp; authorities</strong> — where
                  required by law, regulation, or to establish, exercise or defend
                  legal claims.
                </li>
              </ul>
            </Section>

            <Section id="cookies" index={6} title="Cookies & Tracking">
              <p>
                Our website uses cookies and similar technologies to operate the
                site, remember your preferences, understand how the site is used
                and measure the performance of our communications. Strictly
                necessary cookies are essential to the site&rsquo;s function;
                analytics and preference cookies are set only with your consent,
                which you may manage or withdraw at any time through your browser
                settings or our cookie preferences panel.
              </p>
            </Section>

            <Section id="retention" index={7} title="Data Retention">
              <p>
                We retain personal information only for as long as necessary for the
                purposes for which it was collected, including to satisfy legal,
                accounting, tax and reporting requirements. Reservation and
                financial records are typically retained for up to ten years to meet
                statutory obligations; marketing consents are retained until you
                unsubscribe. When information is no longer required, it is securely
                deleted or anonymised.
              </p>
            </Section>

            <Section id="security" index={8} title="How We Protect Your Data">
              <p>
                We maintain organisational and technical safeguards appropriate to
                the sensitivity of the information we hold, including encryption in
                transit, access controls on a need-to-know basis, tokenisation of
                payment data, staff confidentiality obligations and continuous
                monitoring. While no system can be guaranteed absolutely secure, we
                treat your data with the same care we extend to your privacy on the
                island.
              </p>
            </Section>

            <Section id="transfers" index={9} title="International Transfers">
              <p>
                As a reserve in French Polynesia serving guests worldwide, your
                information may be transferred to and processed in countries outside
                your own, including jurisdictions that may not offer an equivalent
                level of data protection. Where we transfer personal data
                internationally, we rely on appropriate safeguards such as Standard
                Contractual Clauses and equivalent contractual protections.
              </p>
            </Section>

            <Section id="your-rights" index={10} title="Your Rights">
              <p>
                Subject to applicable law, you have the right to access, correct,
                update or delete your personal information; to restrict or object to
                its processing; to data portability; and to withdraw consent. You
                also have the right to lodge a complaint with your local data
                protection authority. To exercise any of these rights, please
                contact us using the details below — we will respond within the
                timeframes required by law.
              </p>
            </Section>

            <Section id="children" index={11} title="Children's Privacy">
              <p>
                Our website and services are directed to adults. We do not knowingly
                collect personal information from children except as provided by a
                parent or guardian in the course of a family reservation. If you
                believe a child has provided us information without appropriate
                consent, please contact us and we will remove it.
              </p>
            </Section>

            <Section id="changes" index={12} title="Changes to This Policy">
              <p>
                We may update this policy from time to time to reflect changes in
                our practices, technology or legal requirements. The date at the top
                of this page indicates when it was last revised. Material changes
                will be communicated through our website or, where appropriate, by
                direct notice.
              </p>
            </Section>

            <Section id="contact" index={13} title="Contacting Us">
              <p>
                For any question about this policy or to exercise your rights, please
                contact our Data Protection Office:
              </p>
              <div className="glass mt-4 rounded-2xl border border-white/10 p-6 not-italic">
                <p className="font-serif text-xl font-light text-sand">
                  {BRAND.legalName}
                </p>
                <p className="mt-2 text-sand/60">{BRAND.address}</p>
                <p className="mt-4 text-sand/60">
                  Email:{" "}
                  <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                </p>
                <p className="text-sand/60">
                  Telephone: <a href={`tel:${BRAND.phone}`}>{BRAND.phone}</a>
                </p>
              </div>
              <p className="pt-4">
                See also our{" "}
                <Link href="/terms">Terms &amp; Conditions</Link> for the terms
                governing reservations and stays.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
