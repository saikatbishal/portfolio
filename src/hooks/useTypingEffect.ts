import { useState, useEffect } from "react";

interface UseTypingEffectOptions {
  text: string;
  delay?: number;
  startDelay?: number;
}

export const useTypingEffect = (
  text: string,
  delay: number = 100,
  startDelay: number = 0
): string => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setCurrentIndex(0);
    setIsStarted(false);

    // Start typing after initial delay
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setIsStarted(true);
      }, startDelay);

      return () => clearTimeout(startTimer);
    } else {
      setIsStarted(true);
    }
  }, [text, startDelay]);

  useEffect(() => {
    if (!isStarted || currentIndex >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, delay, text, isStarted]);

  return displayedText;
};

// Alternative hook with more options
export const useAdvancedTypingEffect = ({
  text,
  delay = 100,
  startDelay = 0,
}: UseTypingEffectOptions) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
    setIsStarted(false);

    // Start typing after initial delay
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setIsStarted(true);
      }, startDelay);

      return () => clearTimeout(startTimer);
    } else {
      setIsStarted(true);
    }
  }, [text, startDelay]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex >= text.length) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, delay, text, isStarted]);

  return {
    displayedText,
    isComplete,
    progress: text.length > 0 ? (currentIndex / text.length) * 100 : 0,
  };
};
