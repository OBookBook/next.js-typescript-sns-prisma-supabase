const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const PORT = 5000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//**
// POST: /api/auth/register
// {
//   "username": "naobe",
//   "email": "teijisdjagi@co.jp",
//   "password": "hashedPassword"
// }
//  */
app.post("/api/auth/register", async (req, res) => {
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
