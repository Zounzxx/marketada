
const express = require("express");
const axios = require("axios");
const app = express();

const config = {
    ownerid: "c3ctpOZt7u",
    appname: "Marketada",
    version: "1.0",
    secret: "ac105104dcafef3466350b583ebd6ff856d30684e7aaae62ad068f5a3d0046e9"
};

app.get("/verificar", async (req, res) => {
    const key = req.query.key;
    if (!key) return res.status(400).json({ success: false, message: "Key não enviada" });

    const data = {
        type: "login",
        key: key,
        secret: config.secret,
        name: config.appname,
        ownerid: config.ownerid,
        version: config.version
    };

    try {
        const response = await axios.post("https://keyauth.win/api/1.0/", data, {
            headers: { "Content-Type": "application/json" }
        });
        return res.json(response.data);
    } catch (err) {
        return res.status(500).json({ success: false, message: "Erro ao verificar key" });
    }
});

app.get("/", (req, res) => {
    res.send("Marketada KeyAuth Proxy online ✅");
});

app.listen(3000, () => {
    console.log("✅ Proxy rodando em http://localhost:3000");
});
