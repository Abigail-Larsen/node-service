var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    console.log("HEYYYY", req.body)
    res.send('API is working properly');
});

module.exports = router;