const express = require("express");
const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.json("Hello, World!");
});

const run = () => {
  app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`);
  });
};

run();
