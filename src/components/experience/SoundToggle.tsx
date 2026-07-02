"use client";

import { useAmbience } from "@/components/providers/AmbienceProvider";
import { cn } from "@/lib/utils";

/**
 * A fixed, always-available control to toggle the synthesised ocean ambience.
 * When on, five bars animate like a soft equaliser.
 */
export function SoundToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useAmbience();

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor={enabled ? "Silence" : "Listen"}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient sound" : "Play ambient ocean sound"}
      className={cn(
        "group flex items-center gap-3 rounded-full border border-gold/25 bg-ink-800/50 px-4 py-2.5 backdrop-blur-md transition-colors hover:border-gold/60",
        className
      )}
    >
      <span className="flex h-4 items-end gap-[3px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "w-[2px] rounded-full bg-gold transition-all duration-300",
              enabled ? "sound-bar" : "h-1 opacity-50"
            )}
            style={enabled ? { animationDelay: `${i * 0.12}s` } : undefined}
          />
        ))}
      </span>
      <span className="text-[10px] uppercase tracking-[0.24em] text-sand/70">
        {enabled ? "Sound On" : "Sound"}
      </span>
      <style jsx>{`
        .sound-bar {
          height: 40%;
          animation: eq 0.9s ease-in-out infinite alternate;
        }
        @keyframes eq {
          0% {
            height: 20%;
          }
          100% {
            height: 100%;
          }
        }
      `}</style>
    </button>
  );
}
