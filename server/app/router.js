import Router from "express";
import config from "./config.js";
import client from "./db/conns/client.js";

const collection = client
.db(config.db.name)
.collection(config.db.collectionName);

const router = new Router();

// TODO: Add routes here (maybe 🤔 start with a GET test route)

export default router;
