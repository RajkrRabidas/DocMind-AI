const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");
const { registerSchema } = require("../config/zod");

const registerUser = async (req, res) => {
  const sanitizedBody = sanitize(req.body);

  const validation = registerSchema.safeParse(sanitizedBody);

  if (!validation.success) {
    const zodError = validation.error;

    let fristErrorMessage = "Validation Failed"
    let allError = []

    if(zodError?.issues && Array.isArray(zodError.issues)){
        allError = zodError.issues.map((issue) => ({
            field: issue.path ? issue.path.join(".") : "unknown",
            message: issue.message || "validation error",

            code: issue.code || "validation_error",
        }))
        fristErrorMessage = allError[0]?.message || "Validation Failed"
    }

    const {name, email, password, avatar} = validation.data;

    

    return res
      .status(400)
      .json({ message: fristErrorMessage, errors: allError });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  return res.status(200).json({ message: "User logged in successfully", user });
};

module.exports = {
  registerUser,
  loginUser,
};
