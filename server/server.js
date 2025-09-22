import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import { contact } from "./module/contact.model.js";
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
    const contacts = await contact.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "All contacts", contacts });
  } catch (error) {
    res.status(500).json({ message: "contact empty" });
  }
});


// Add contact
apiRouter.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    // console.log("name:", name, "email:", email, "phone:", phone);

    const newcontact = await contact.create({ name, email, phone });

    res.status(201).json({
      message: "contact saved successfully!",
      contact: newcontact
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit contact
apiRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const existingcontact = await contact.findById(id);
    if (!existingcontact) {
      return res.status(404).json({ message: "contact not found" });
    }

    const updatedcontact = await contact.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "contact has been updated!", contact: updatedcontact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete contact
apiRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const existingcontact = await contact.findById(id);
    if (!existingcontact) {
      return res.status(404).json({ message: "contact not found" });
    }

    await contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Your contact has been deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.use('/api', apiRouter);

const PORT = process.env.PORT || 5000; 
// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));