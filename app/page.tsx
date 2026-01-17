"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

const fullText = "francanete.dev";

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [displayedText]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        {displayedText}
        <span className={styles.cursor}>|</span>
      </h1>
    </div>
  );
}
