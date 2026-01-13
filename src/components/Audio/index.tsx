import { forwardRef, useImperativeHandle, useRef } from "react";
import copyAudio from "@/assets/audio/copy.mp3";

export interface AudioRef {
  play: () => void;
}

interface AudioProps {
  src?: string;
}

const Audio = forwardRef<AudioRef, AudioProps>((props, ref) => {
  const { src = copyAudio } = props;
  const audioRef = useRef<HTMLAudioElement>(null);

  useImperativeHandle(ref, () => ({
    play: playAudio,
  }));

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset audio to beginning and load it again to ensure it plays
    audio.currentTime = 0;
    audio.load();
    // Silently handle play errors (e.g., if audio is not ready)
    audio.play().catch(() => {});
  };

  return <audio ref={audioRef} src={src} />;
});

export default Audio;
