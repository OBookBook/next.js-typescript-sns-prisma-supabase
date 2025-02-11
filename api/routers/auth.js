const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const router = require("express").Router();

//**
// POST: /api/auth/register
// {
//   "username": "naobe",
//   "email": "teijisdjagi@co.jp",
//   "password": "hashedPassword"
// }
//  */
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return res.json({ user });
});

//**
// POST: /api/auth/login
// {
//   "email": "teijisdjagi@co.jp",
//   "password": "hashedPassword"
// }
// response
// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczOTI4MTg0NCwiZXhwIjoxNzM5Mjg1NDQ0fQ.4JQw2PXTayxn1UQHngqJtY9x8jaP2Fb09IR1Kul7gAg"
// }
//  */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.json({ token });
});

module.exports = router;
