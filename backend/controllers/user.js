const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token")

// CREATE User
router.post('/', async (req, res) => {
    const user = await User.findOne({
        where: { email: req.body.email }
    })
    if(!user){
        let { password, ...rest } = req.body;
        const user = await User.create({
            ...rest, 
            password: await bcrypt.hash(password, 12)
        })
        const result = await jwt.encode(process.env.JWT_SECRET, {id: user._id})
        return res.json({user, token: result.value})   
    } else {
        return res.status(400).json({message: "Username already exists!"})
    }
})

// READ all Users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    };
});

module.exports = router;