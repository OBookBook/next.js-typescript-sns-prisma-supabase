const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

router.post("/post", async (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const user = await prisma.post.create({
      data: {
        content,
        authorId: 1,
      },
    });
    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "User registration failed" });
  }
});

module.exports = router;
