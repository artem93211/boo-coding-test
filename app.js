"use strict";

import express from "express";
import profileRoutes from "./routes/profile.js";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comment.js";
import { getCollections } from "./database/connect.js";

const app = express();
const port = process.env.PORT || 3000;

getCollections()
    .then(() => {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // set the view engine to ejs
        app.set("view engine", "ejs");

        // routes
        app.get("/", (req, res) => {
            res.redirect("/profiles");
        });
        app.use("/profiles", profileRoutes);
        app.use("/users", userRoutes);
        app.use("/comments", commentRoutes);

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send("Something went wrong!");
        });

        // start server
        app.listen(port, () => {
            console.log("Express started. Listening on %s", port);
        });
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.error("Database connection failed", err);
    });

export default app;
