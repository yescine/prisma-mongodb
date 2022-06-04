import { PrismaClient, Post } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 333;
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } });
  res.send(users);
});

app.post("/posts", async (req, res) => {
  const { title, authorId } = req.body as Post;
  const result = await prisma.post.create({
    data: {
      title,
      author: { connect: { id: authorId } },
    },
  });
  res.send(`post created ${result.id}`);
});

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
