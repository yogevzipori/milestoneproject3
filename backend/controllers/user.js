const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// CREATE User
router.post("/", async (req, res) => {
    try {
        let { password, ...rest } = req.body;
        const user = await User.create({
            ...rest,
            passwordDigest: await bcrypt.hash(password, 10)
        });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message});
    };
});

// READ all Users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

// READ one user
router.get("/:id", getUser, (req, res) => {
    res.json(res.user);
});

// UPDATE user
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.firstName != null) {
        res.user.firstName = req.body.firstName;
    };
    if (req.body.lastName != null) {
        res.user.lastName = req.body.lastName;
    };
    if (req.body.email != null) {
        res.user.email = req.body.email;
    };
    if (req.body.password != null) {
        res.user.password = req.body.password;
    };
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message});
    };
});

// DELETE user
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "Deleted user"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

// MIDDLEWARE
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        };
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
    res.user = user;
    next();
};

module.exports = router;