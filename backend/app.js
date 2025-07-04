const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("dotenv").config();

const PORT = process.env.DEV_PORT;

const FRONTEND_URL =
    process.env.ENV == "development"
        ? process.env.FRONTEND_URL_DEV
        : process.env.FRONTEND_URL;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    })
);

const login = require("./routes/login");
app.use("/api/login", login);

const auth = require("./routes/auth");
app.use("/api/auth", auth);

const logout = require("./routes/logout");
app.use("/api/logout", logout);

const home = require("./routes/home");
app.use("/api/home", home);

const product = require("./routes/product");
app.use("/api/product", product);

const run = async () => {
    app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}/api`);
    });
};

run();
