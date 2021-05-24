const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Basic Route running'
    })
})


module.exports = router;