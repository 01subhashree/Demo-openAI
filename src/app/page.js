"use client";

import { useState } from "react";
import styles from "./page.module.css";

const OPENAI_API_KEY = "YOUR_API_KEY";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [fetchImages, setFetchImages] = useState([]);

  const getImages = async () => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputText,
        n: 4,
        size: "1024x1024",
      }),
    };
    try {
      const res = await fetch(
        "https://api.openai.com/v1/images/generations",
        options
      );
      const data = await res.json();
      setFetchImages(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("fetchImages", fetchImages);
  return (
    <main className={styles.main}>
      <h1>AI Image Generator</h1>
      <div className={styles.contentDiv}>
        {fetchImages &&
          fetchImages.map((ele, index) => (
            <img key={index} src={ele.url} className={styles.imageContent} />
          ))}
      </div>
      <div className={styles.buttomDiv}>
        <input
          className={styles.inputBOx}
          placeholder="Enter text ..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <img
          onClick={getImages}
          src="https://icon-library.com/images/submit-icon-png/submit-icon-png-13.jpg"
          alt="submit button"
          width={25}
        />
      </div>
    </main>
  );
}
