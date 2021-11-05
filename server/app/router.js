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

// get all listings
router.get("/listings", async (_, res) => {
    const listingsData = await collection.find({}).toArray();
    res.json(listingsData);
});

// get listing by id (dynamic route)
router.get("/listings/:id", async (req, res) => {
    const listing = await collection.findOne({ _id: req.params.id });
    res.json(listing);
});

// get reviews for one listing
router.get("/reviews/:id", async (req, res) => {
    const reviews = await collection.findOne({ _id: req.params.id});
    res.json(reviews.reviews);
})
// post a new listing
router.post("/listings", async (req,res) => {
    const newListing = await collection.insertOne(req.body);
    res.json(newListing);
})
// delete a listing
router.delete("/listings/:id", async (req, res) => {
    const deletedListing = await collection.deleteOne({ _id: req.params.id });
    res.json(deletedListing);
});
export default router;
