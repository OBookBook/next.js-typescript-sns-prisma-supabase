const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

//**
// POST: /api/posts/post
// {
//   "content": "next.js"
// }
//  */
router.post("/post", async (req, res) => {
  const { content } = req.body;
  console.log(content);

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const user = await prisma.post.create({
      data: {
        content,
        authorId: 1,
      },
      include: {
        author: true,
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

//**
// GET: /api/posts/post
//*/
router.get("/post", async (req, res) => {
  try {
    const latestPosts = await prisma.post.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    return res.status(200).json({ latestPosts });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: error.message || "Post retrieval failed" });
  }
});

module.exports = router;
