const router = require("express").Router();
const articleRoutes = require("./articles");
const searchRoute = require("./search");


// articles routes
router.use("/articles", articleRoutes);

// search routes
router.use("/search", searchRoute);

module.exports = router;
