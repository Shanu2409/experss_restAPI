const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@des reginster a user
//@route post /api/user/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !!");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!!");
  }

  //Hashed password
  const hasedPassword = await bcrypt.hash(password, 10);

  //don't forget to add "await", you are a peace of shit!!!!!!!!!

  console.log("our hashed passowrd : ", hasedPassword);

  const u1 = await User.create({
    username,
    email,
    password: hasedPassword,
  });

  if (u1) {
    res.status(201).json({ _id: u1.id, email: u1.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//@des login a user
//@route post /api/user/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  console.log("collected");

  const user = await User.findOne({ email });

  console.log("got the user");

  //compare password

  if (user && (await bcrypt.compare(password, user.password))) {
    // console.log(user && (await bcrypt.compare(password, user.password)));
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRAT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Wrong id or password");
  }
});

//@des get current user
//@route get /api/user/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  // console.log(req.user);
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
