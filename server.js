const express = require("express");
const next = require("next");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cors()); // Enable CORS
  server.use(express.json()); // Parse JSON request bodies

  server.post("/generate-css", (req, res) => {
    const { botId, cssContent } = req.body;
    const filePath = path.join(__dirname, `/public/${botId}.css`);

    fs.writeFile(filePath, cssContent, (err) => {
      if (err) {
        console.log("Error writing CSS file:", err);
        res.status(500).send("Error generating CSS");
      } else {
        console.log("CSS file generated successfully");
        res.status(200).send(`http://localhost:3000/${botId}.css`);
      }
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
