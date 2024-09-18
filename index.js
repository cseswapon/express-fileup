const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Apply CORS middleware
app.use(cors());

// Define the upload directory
const uploadDirectory ='/tmp/uploads' || path.join(__dirname, "uploads");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Set up Multer to store files locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload file route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  res.send({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

// Get file route
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(uploadDirectory, req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("File not found");
    }

    res.sendFile(filePath);
  });
});

// Delete file route
app.delete("/files/:filename", (req, res) => {
  const filePath = path.join(uploadDirectory, req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).send("File not found");
    }

    res.send("File deleted successfully");
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
