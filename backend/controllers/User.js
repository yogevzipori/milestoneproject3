const router = require("express").Router();
const User = require("../models/user");

// CREATE
router.post("/", async (req, res) => {
    try {
        const newUser = await User.create(req.params);
        console.log(newUser);
        res.send(newUser)
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
})

// READ (GET)
router.get("/", async (req, res) => {
    try {
        const Users = await User.find();
        console.log(Users)
        res.send(Users);
    } catch (err) {
        console.log(err.message)
        res.send(err.message)
    };
});

module.exports = router;