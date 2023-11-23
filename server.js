const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const fs = require("fs");
const multer = require("multer");
const sharp = require("sharp");

require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "Your API_KEY",
});

app.post("/images", async (req, res) => {
  // console.log("prompt", req.body.message);
  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: req.body.message,
      n: 5,
      size: "1024x1024",
    });
    // console.log("image", response.data);
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    // console.log("file", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");

let filePath;

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    // console.log("file", req.file);
    filePath = req.file.path;
    console.log("filepath", filePath);
  });
});

// console.log("filepath typeof --", typeof filePath);

app.post("/variations", async (req, res) => {
  try {
    const imageBuffer = (
      await sharp(filePath).toFormat("jpeg").toBuffer()
    ).toString();

    console.log("image path ::", imageBuffer);

    const Response = await openai.createImageVariation(
      fs.createReadStream(
        "https://cdn.openai.com/API/images/guides/image_variation_original.webp"
      ),
      "dall-e-2",
      1,
      "1024x1024"
    );
    console.log("image-data", Response);
    // res.send(image.data.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => console.log("Your server is running on PORT " + PORT));
