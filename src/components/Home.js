import { useEffect, useState } from "react";
import styles from "./Home.module.css";

// const OPENAI_API_KEY = "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";
// const OPENAI_API_KEY = "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";

export default function Home() {
  const [fetchData, setfetchData] = useState("");
  const [value, setValue] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [previousChat, setPreviousChat] = useState([]);

  const createNewChat = () => {
    setfetchData("");
    setValue("");
    setCurrentTitle("");
  };
  const getChat = async () => {
    // console.log(value);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: value,
          },
        ],
        max_tokens: 100,
      }),
    };
    try {
      const Res = await fetch("http://localhost:8000/completions", options);
      const data = await Res.json();
      // console.log("data", data);
      setfetchData(data.choices[0].message);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("currentTitle", currentTitle);
  useEffect(() => {
    console.log(currentTitle, value, fetchData);
    if (!currentTitle && value && fetchData) {
      setCurrentTitle(value);
    }
    if (currentTitle && value && fetchData) {
      setPreviousChat((perviousChat) => [
        ...perviousChat,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: fetchData.role,
          content: fetchData.content,
        },
      ]);
    }
  }, [fetchData, currentTitle]);

  console.log("previousChat", previousChat);

  const currentChat = previousChat.filter(
    (chat) => chat.title === currentTitle
  );

  const historyData = Array.from(
    new Set(previousChat.map((previousChat) => previousChat.title))
  );
  console.log(historyData);

  const handleClick = (ele) => {
    setCurrentTitle(ele);
    setValue("");
    setfetchData("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.leftSidebar}>
        <div className={styles.buttonDiv}>
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.IxjleaQdJ-PbHB9eekqqUQHaHb&pid=Api&P=0&h=180"
            width={40}
            style={{ borderRadius: "2rem" }}
            alt="logo"
          />
          <button className={styles.button} onClick={createNewChat}>
            New Chat
          </button>
        </div>
        <div className={styles.history_Div}>
          {historyData &&
            historyData.map((e, index) => (
              <p key={index} onClick={() => handleClick(e)}>
                {e}
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

        <div className={styles.outputDiv}>
          {currentChat &&
            currentChat.map((chats, index) => (
              <div key={index} className={styles.contentDiv}>
                <p className={styles.roles}>{chats.role}</p>
                <p>{chats.content}</p>
              </div>
            ))}
        </div>

        <div className={styles.buttom_section}>
          <div className={styles.input_div}>
            <input
              className={styles.inputBox}
              placeholder="Message ChatGPT ..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button className={styles.submit} onClick={getChat}>
              Submit
            </button>
          </div>
          <p>
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}
