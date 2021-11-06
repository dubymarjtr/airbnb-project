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
router.get("/listings", async (req, res) => {
    const listingsData = await collection.find(
        { $or:[ 
            {name: {$regex: (req.body.keywords? req.body.keywords : ""), $options: "i" }}, 
            {description: {$regex: (req.body.keywords? req.body.keywords : ""), $options: "i"}},
        ]})
        .limit(req.body.limit? req.body.limit : 0)
        .toArray();
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

// post a review for one listing
router.post("/reviews/:id", async (req,res) => {
    const listing = await collection.updateOne(
        { _id: req.params.id}, 
        { $push : { reviews: req.body }});
    res.json(listing);
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

// delete a review
router.delete("/reviews/:id", async (req, res) => {
    const deletedReview = await collection.updateOne(   
        {"reviews._id": req.params.id},       
        { $pull: { "reviews": { '_id': req.params.id }}})
    res.json(deletedReview);
})

// update a listing
router.put("/listings/", async (req, res) => {
    const updatedListing = await collection.updateOne({ _id: req.body.id},
    { $set: req.body.payload });
    res.json(updatedListing);
})

// update a review
router.put("/reviews/", async (req, res) => {
    const updatedReview = await collection.updateOne({'reviews._id': req.body.id},
    { $set: { 'reviews.$': req.body.payload }});
    res.json(updatedReview);
})

export default router;
