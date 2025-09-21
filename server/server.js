import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import { blog } from "./module/Blog.model.js";
dotenv.config();

const app = express();
const apiRouter = express.Router(); 

// Middlewares
app.use(express.json());
app.use(cors())

app.use(cors({
  origin: ['http://www.mokchhedulislam.page.gd','http://localhost:5173'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'data'
})
  .then(() => console.log("MongoDB Connected..!"))
  .catch((err) => console.error("MongoDB Error:", err));


apiRouter.get("/", async (req, res) => {
  try {
    const Blog = await blog.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All blogs", Blog });
  } catch (error) {
    res.status(500).json({ message: "blog empty" });
  }
});


// Add blog
apiRouter.post("/", async (req, res) => {
  const { title, desc, content } = req.body;

  try {
    // console.log("title:", title, "desc:", desc, "content:", content);

    const newBlog = await blog.create({ title, desc, content });

    res.status(201).json({
      message: "Blog saved successfully!",
      blog: newBlog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit blog
apiRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Blog has been updated!", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete blog
apiRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const existingBlog = await blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Your blog has been deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.use('/api', apiRouter); [8]

const PORT = process.env.PORT || 5000; 
// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));