import { useCallback } from "react";

export const useSound = () => {
  const playClick = useCallback(() => {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();

    // Create a buffer for white noise (shutter sound texture)
    const bufferSize = ctx.sampleRate * 0.05; // 50ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter the noise to make it sound more mechanical
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 1200;
    noiseFilter.Q.value = 1;

    // Envelope for the noise
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Add a "click" tone
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.15, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.start();
    osc.start();

    // Cleanup
    setTimeout(() => {
      ctx.close();
    }, 200);
  }, []);

  return { playClick };
};
