import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post("/users", async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
      },
    });

    res.status(201).send("User added successfully!");
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  let users = [];

  try {
    if (req.query) {
      users = await prisma.user.findMany({
        where: {
          name: {
            name: req.query.name,
          },
        },
      });
    } else {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
      },
    });
    res.status(200).send("User updated successfully!");
  } catch (error) {
    console.log(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("User deleted successfully!");
  } catch (error) {
    console.log(error);
  }
});
