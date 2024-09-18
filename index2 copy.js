const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const app = express();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dqxz8bsv3",
  api_key: "681224826957516",
  api_secret: "9oaqf1b4W3NVl5VNIIovj0qtv3M",
});

app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.static("uploads"));

console.log(path.join(__dirname, "uploads"));

app.get("/", async (req, res) => {
  res.status(200).send({ message: "File Upload test" });
});

app.post("/upload", async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send("No file uploaded");
    }

      
      let uploadedFile = req.files.file;
    /*
      // Check if file with the same name already exists in DB
    const existingFile = await File.findOne({ name: uploadedFile.name });

    if (existingFile) {
      return res.status(409).send({
        status: false,
        message: 'Duplicate file, already exists.'
      });
    }
      */
    let uploadPath = path.join(__dirname, "temp", uploadedFile.name);
     await uploadedFile.mv(uploadPath);
    /* // Store file details in MongoDB
    const newFile = new File({
      name: uploadedFile.name,
      path: uploadPath,
      size: uploadedFile.size,
      mimetype: uploadedFile.mimetype,
    });

    await newFile.save(); */
   
      
      res.status(200).send({
      status: true,
      message: "File uploaded successfully",
      data: {
        name: uploadedFile.name,
        mimetype: uploadedFile.mimetype,
        size: uploadedFile.size,
      },
      
    }); 
      
      /*  const result = await cloudinary.uploader.upload(
         uploadedFile.tempFilePath,
         {
           resource_type: "auto",
         }
       );

       res.status(200).send({
         status: true,
         message: "File uploaded successfully to Cloudinary",
         data: result,
       }); */
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
