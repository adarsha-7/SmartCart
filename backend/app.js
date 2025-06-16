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

const login = require("./routes/login");
app.use("/api/login", login);

const run = async () => {
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}/api`);
    });
};

run();
