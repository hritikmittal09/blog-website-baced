import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: './uploads/',  // Folder to store uploaded files
    filename: (req, file, cb) => {
      // Rename the file with the current timestamp to avoid conflicts
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }  // Limit the file size to 1MB
  });
  export  const uploadMiddleware = upload.single('file')
