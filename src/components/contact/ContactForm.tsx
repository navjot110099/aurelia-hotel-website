"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Check,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const INTERESTS = [
  "A stay",
  "Wedding or event",
  "Full island buyout",
  "Dining reservation",
  "General enquiry",
] as const;

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Please enter a contact number.")
    .regex(/^[+()\-\s\d]+$/, "Please enter a valid phone number."),
  interest: z.enum(INTERESTS, {
    errorMap: () => ({ message: "Please choose the nature of your enquiry." }),
  }),
  message: z
    .string()
    .min(10, "A few more words will help us prepare.")
    .max(1000, "Please keep your note under 1000 characters."),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 font-sans text-sand placeholder:text-sand/30 transition-colors duration-300 focus:border-gold/60 focus:outline-none focus:ring-1 focus:ring-gold/30";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "A stay",
      message: "",
    },
  });

  const onSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSent(true);
    reset();
  };

  return (
    <div className="relative rounded-3xl border border-white/10 bg-ink-800/50 p-8 md:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex min-h-[24rem] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 13 }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-ink shadow-gold"
            >
              <Check size={28} strokeWidth={2.5} />
            </motion.span>
            <p className="eyebrow mb-4 text-gold">Enquiry received</p>
            <h3 className="font-serif text-3xl font-light text-sand">
              Thank you — we’ll be in touch shortly.
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand/55">
              A member of our reservations atelier will reply personally, usually
              within a few hours. If your enquiry is time-sensitive, do call us
              directly at any hour.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-8 text-[11px] uppercase tracking-[0.22em] text-gold transition-colors hover:text-gold-light"
            >
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="eyebrow mb-2 flex items-center gap-3 text-gold">
              <Sparkles size={14} /> Send an enquiry
            </p>
            <h3 className="mb-8 font-serif text-3xl font-light text-sand">
              Tell us what you have in mind.
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Full name" icon={UserIcon} error={errors.name?.message}>
                <input
                  {...register("name")}
                  placeholder="Katherine Ashford"
                  className={inputClass}
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" icon={Mail} error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </Field>
              <Field label="Telephone" icon={Phone} error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+44 20 0000 0000"
                  className={inputClass}
                  autoComplete="tel"
                />
              </Field>
              <Field
                label="Nature of enquiry"
                icon={Sparkles}
                error={errors.interest?.message}
              >
                <select
                  {...register("interest")}
                  className={cn(inputClass, "cursor-pointer [&>option]:bg-ink-800")}
                >
                  {INTERESTS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field
                  label="Your message"
                  icon={MessageSquare}
                  error={errors.message?.message}
                >
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Your dates, your party, the occasion — and anything that would make the stay perfect."
                    className={cn(inputClass, "resize-none")}
                  />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group relative mt-8 flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gold-gradient px-9 py-4 text-[11px] uppercase tracking-[0.22em] text-ink shadow-gold transition-all duration-500 hover:shadow-[0_0_80px_-10px_rgba(201,169,97,0.7)] disabled:opacity-70"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-luxe group-hover:translate-x-full" />
              <span className="relative z-10 flex items-center gap-3">
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send enquiry
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    />
                  </>
                )}
              </span>
            </button>

            <p className="mt-4 text-center text-[11px] text-sand/40">
              Your details are held in confidence and never shared.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: typeof Mail;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold">
        <Icon size={14} /> {label}
      </span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 block text-[11px] text-gold-light"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
