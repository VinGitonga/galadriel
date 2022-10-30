const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const path = require("path")
const fetch = require("node-fetch")

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const VIDEOSDK_API_KEY = process.env.VIDEOSDK_API_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

// loads the items .env file into process.env

const app = express();

app.use(express.json());
// app.use(cors());

app.listen(5000, () => {
    console.log(`Server listening at port 5000`);
});

app.get("/", (req, res) => {
    res.send("Hey this is my API running 🥳");
});

app.get("/get-token", async (req, res) => {
    const options = {
        expiresIn: "10m",
        algorithm: "HS256",
    };

    const payload = {
        apikey: VIDEOSDK_API_KEY,
        permissions: [`allow_join`], // `ask_join` || `allow_mod`
        version: 2,
    };

    const token = jwt.sign(payload, SECRET_KEY, options);

    console.log(token);

    res.status(200).json(token);
});

app.post("/create-meeting", async (req, res) => {
    const { token } = req.body;
    console.log("Got token", token);
    const options = {
        method: "POST",
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
    };
    const url = `https://api.videosdk.live/v2/rooms`;
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    return res.json(data);
});

app.get("/validate-meeting/:token/:roomId", async (req, res) => {
    const { roomId, token } = req.params;
    console.log(token);
    console.log(roomId);
    let isValidated = false;

    const options = {
        method: "GET",
        headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
        },
    };

    const url = `https://api.videosdk.live/v2/rooms/validate/${roomId}`;
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);

    isValidated = data?.roomId === roomId ? true : false;

    console.log(isValidated);

    res.status(200).json({ isValidated });
});


module.exports = app