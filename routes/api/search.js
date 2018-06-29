const router = require("express").Router();
const searchController = require("../../controllers/searchController");

// matches with /api/search
router
    .route("/")
    .get(searchController.getSearch);

module.exports = router;