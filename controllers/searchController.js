const axios = require("axios");
const db = require("../models");


// getSea searches the NYT API and returns only the entries we haven't already saved
module.exports = {
    getSearch: function (req, res) {
        const params = Object.assign(
            { api_key: "9b3adf57854f4a19b7b5782cdd6e427a" },
            req.query
        );
        axios
            .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
                params
            })
            .then(articles => res.json(articles.data.response.docs))
            .catch(err => res.status(422).json(err));
    }
};