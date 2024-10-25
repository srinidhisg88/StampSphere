// import multer from "multer";

// const storage = multer.diskStorage({
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
//   })
  
// export const upload = multer({ storage: storage });

import multer from 'multer';
import path from 'path';

// Configure multer to store files temporarily in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;