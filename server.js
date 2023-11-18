const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = "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";

app.post("/completions", async (req, res) => {
  //   console.log(req.body.message);
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
          content: req.body.messages[0].content,
        },
      ],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    // console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
