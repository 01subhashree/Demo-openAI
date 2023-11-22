"use client";
import { useState } from "react";
import styles from "./page.module.css";

const OPENAI_API_KEY = "";

export default function Home() {
  const [data, setData] = useState("");
  const [inputData, setInputData] = useState("");
  const [historyData, setHistoryData] = useState("");

  const handleClick = (text) => {
    setInputData(text);
  };
  const clickHandler = async () => {
    console.log(inputData);
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: inputData,
          },
        ],
        max_tokens: 100,
      }),
    };
    try {
      const res = await fetch(
        " https://api.openai.com/v1/chat/completions",
        options
      );
      const fetchData = await res.json();
      const ouput = fetchData.choices[0].message.content;
      setData(ouput);
      console.log(fetchData);
      setHistoryData([...historyData, inputData]);
      setInputData("");
    } catch {
      (err) => console.log(err);
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.leftSidebar}>
        <div className={styles.buttonDiv}>
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.IxjleaQdJ-PbHB9eekqqUQHaHb&pid=Api&P=0&h=180"
            width={40}
            style={{ borderRadius: "2rem" }}
          />
          <button className={styles.button} onClick={clickHandler}>
            New Chat
          </button>
        </div>
        <div className={styles.history_Div}>
          {historyData &&
            historyData.map((ele, index) => (
              <p key={index} onClick={() => handleClick(ele)}>
                {ele}
              </p>
            ))}
        </div>
        <div>
          <p>Made by subhashree</p>
        </div>
      </div>
      <div className={styles.rightSidebar}>
        <div className={styles.navbar}>
          <h2>ChatGPT</h2>
        </div>
        <p className={styles.outputDiv}>{data}</p>
        <div className={styles.buttom_section}>
          <div className={styles.input_div}>
            <input
              className={styles.inputBox}
              placeholder="Message ChatGPT ..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button className={styles.submit} onClick={clickHandler}>
              Submit
            </button>
          </div>
          <p>
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </main>
  );
}
