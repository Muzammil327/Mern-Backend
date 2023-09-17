import multer from "multer";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now, you can use __dirname in your code
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    

const uploadDir = path.join('./public/image/product/'); 

    // cb(null, './public/image/product/'); // Specify the upload directory
    cb(null, uploadDir); // Specify the upload directory

    // const imagePath = path.join(__dirname, 'uploads', imageName);
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname); // Define the filename
  },
});

const upload = multer({ storage: storage });

export default upload;
