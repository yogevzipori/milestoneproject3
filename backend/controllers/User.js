const router = require("express").Router();
const User = require("../models/user");

// READ (GET)
router.get("/", async (req, res) => {
    try {
        const Users = await User.find();
        res.send(Users);
    } catch (err) {
        res.send(message.err)
    };
});

module.exports = router;