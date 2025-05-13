import { Request, Response, NextFunction } from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { ApplyModel } from "../modules/apply/apply.model";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/temp");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

// Filter to only accept PDFs
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Middleware for uploading to Gofile
export const uploadToGofile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // If no file was uploaded, continue to next middleware
    if (!req.file) {
      return next();
    }

    try {
      // console.log("req.body", req.body);
      // console.log("req.file", req.file);
      const existingApplication = await ApplyModel.findOne({
        "user.userId": req.body.userId,
        taskId: req.body.jobId,
      });

      // console.log("existingApplication", existingApplication);

      if (existingApplication) {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        res.status(400).json({
          success: false,
          message: "You have already applied for this job",
        });
        return;
      }
    } catch (error: any) {
      next(error);
    }

    // API token should be stored in environment variables
    const apiToken = process.env.GOFILE_API_TOKEN;

    if (!apiToken) {
      throw new Error("Gofile API token is missing");
    }

    // Create form data for Gofile
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    // Upload to Gofile
    const uploadResponse = await axios.post(
      "https://upload.gofile.io/uploadfile",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${apiToken}`,
        },
      }
    );

    // Check if upload was successful
    if (uploadResponse.data.status !== "ok") {
      throw new Error("Failed to upload file to Gofile");
    }
    // console.log("File uploaded to Gofile successfully:", uploadResponse , uploadResponse.data);
    // Add file URL to request body
    req.body.resumeLink = uploadResponse.data.data.downloadPage;

    // Clean up temporary file
    fs.unlinkSync(req.file.path);

    next();
  } catch (error) {
    // Clean up temporary file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};
