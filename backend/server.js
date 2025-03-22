const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

mongoose.connect("mongodb://localhost:27017/hire360_ai", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

app.use(cors());
app.use(bodyParser.json());

const candidateSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  gender: String,
  candidateId: { type: Number, required: true, unique: true }
});

const Candidate = mongoose.model("Candidate", candidateSchema);

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: String,
  salary: String,
  location: String,
  tags: [String],
  postedAt: { type: Date, default: Date.now }
});

const Job = mongoose.model("Job", jobSchema);

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const candidate = await Candidate.findOne({ email });
  
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }

      if (candidate.password === password) {
        res.status(200).json({ message: "Login successful", candidate });
      } else {
        res.status(400).json({ message: "Incorrect password" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error during login", error: err });
    }
  });
  

app.post("/api/jobs", async (req, res) => {
  const { title, description, skills, salary, location, tags } = req.body;

  const newJob = new Job({
    title,
    description,
    skills,
    salary,
    location,
    tags
  });

  try {
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).send("Error saving job details: " + err);
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs); 
  } catch (err) {
    res.status(500).send("Error fetching jobs: " + err);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
