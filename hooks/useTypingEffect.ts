import { useEffect, useState } from "react";

export function useTypingEffect() {
  const [text, setText] = useState("");

  useEffect(() => {
    const words = [
      "Software Engineering Student",
      "Frontend Developer",
      "Backend Developer",
      "Problem Solver",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const word = words[wordIndex];

      if (isDeleting) {
        setText(word.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setText(word.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === word.length) {
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    };

    const interval = setInterval(type, isDeleting ? 40 : 80);
    return () => clearInterval(interval);
  }, []);

  return text;
}