const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.DEV_PORT;

const app = express();
app.use(express.json());

const FRONTEND_URL =
    process.env.ENV == "development"
        ? process.env.FRONTEND_URL_DEV
        : process.env.FRONTEND_URL;

app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    })
);

app.get("/", (req, res) => {
    res.json("Hello, World!");
});

app.post("/api/login/signup", (req, res) => {
    res.json({ msg: "Request received" });
});

const run = () => {
    app.listen(PORT, () => {
        console.log(`Server listening in http://localhost:${PORT}`);
    });
};

run();
