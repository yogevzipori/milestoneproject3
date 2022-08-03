const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token")

router.post("/", async (req, res) => {
    const user = await User.findOne({
        where: { email: req.body.email }
    });

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        res.status(404).json({ message: "Could not find a user with the provided email and password" });
    } else {
        const result = await jwt.encode(process.env.JWT_SECRET, { _id: user._id })
        res.json({ user: user, token: result.value });
    };
});

router.post("/logout", (req, res) => {
    req.currentUser = null
    res.status(200).json()
})

router.get('/profile', async (req, res) => {
    res.json(req.currentUser)
})

module.exports = router;