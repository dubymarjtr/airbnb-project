import Router from "express";
import config from "./config.js";
import client from "./db/conns/client.js";

const collection = client
.db(config.db.name)
.collection(config.db.collectionName);

const router = new Router();

// localhost:3000/api
router.get("/", (_, res) => {
    res.send("Hello from API router");
});

export default router;
