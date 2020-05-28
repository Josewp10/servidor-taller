const express = require('express');
const router = express.Router();

router.post("/login", (req, res)=>{
    let body = req.body;

    res.send("Login de usuarios")
});

module.exports = router;