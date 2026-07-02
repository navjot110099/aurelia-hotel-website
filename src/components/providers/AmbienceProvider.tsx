"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";

/**
 * Ambient ocean sound, synthesised in the browser with the Web Audio API —
 * no audio files required. We generate brown noise (the sea), band-pass it,
 * and modulate its gain with a slow LFO so it breathes like the tide. A gentle
 * high sine adds distant wind. Everything is gated behind an explicit user
 * toggle to respect autoplay policies and guest comfort.
 */

type AmbienceCtx = {
  enabled: boolean;
  toggle: () => void;
};

const Ctx = createContext<AmbienceCtx>({ enabled: false, toggle: () => {} });
export const useAmbience = () => useContext(Ctx);

export function AmbienceProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<{
    ctx: AudioContext;
    master: GainNode;
  } | null>(null);

  const build = useCallback(() => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();

    // ---- Brown noise buffer (the body of the sea) ----
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 480;
    bandpass.Q.value = 0.7;

    // ---- Slow swell (the tide) ----
    const swell = ctx.createGain();
    swell.gain.value = 0.18;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.12;
    lfo.connect(lfoGain).connect(swell.gain);

    // ---- Distant wind (a whisper of high sine) ----
    const wind = ctx.createOscillator();
    wind.type = "sine";
    wind.frequency.value = 220;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.008;

    const master = ctx.createGain();
    master.gain.value = 0;

    noise.connect(bandpass).connect(swell).connect(master);
    wind.connect(windGain).connect(master);
    master.connect(ctx.destination);

    noise.start();
    lfo.start();
    wind.start();

    // Fade in.
    master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 2.5);

    audioRef.current = { ctx, master };
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        if (!audioRef.current) build();
        else {
          const { ctx, master } = audioRef.current;
          ctx.resume();
          master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.5);
        }
      } else if (audioRef.current) {
        const { ctx, master } = audioRef.current;
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      }
      return next;
    });
  }, [build]);

  return (
    <Ctx.Provider value={{ enabled, toggle }}>{children}</Ctx.Provider>
  );
}
