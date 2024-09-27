import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import multer from 'multer';

// Simulate __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage engine to save files in the 'uploads' directory
const storage = multer.diskStorage({
  destination: './uploads/',  // Folder to store uploaded files
  filename: (req, file, cb) => {
    // Rename the file with the current timestamp to avoid conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize Multer for handling file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }  // Limit the file size to 1MB
});

// Middleware to store file path in req.image
export const uploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload failed', error: err });
    }
    
    // If file is uploaded successfully
    if (req.file) {
      // Store the full file path in req.image
      req.image = path.join(__dirname, 'uploads', req.file.filename);
    }

    // Call the next middleware or route handler
    next();
  });
};
