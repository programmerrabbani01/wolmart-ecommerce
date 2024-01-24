// import multer from "multer";

// // create multer storage

// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     if (file.filename == "cv") {
//       const { name, age } = req.body;
//       cb(null, name + "_" + age + "_" + "cv" + file.originalname);
//     } else {
//       cb(null, Date.now() + "_" + file.originalname);
//     }
//   },
//   destination: (req, file, cb) => {
//     if (file.filename == "photo") {
//       cb(null, "public/photo");
//     }
//   },
// });

// // user photo multer middleware

// export const userPhotoMulter = multer({ storage }).array("users", 10);

// // export storage

// export default storage;

// import multer from "multer";

// import path from "path";

// const __dirname = path.resolve();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.fieldname == "brandPhoto") {
//       cb(null, path.join(__dirname, "/public/photo/BrandPhoto"));
//     }

//     if (file.fieldname == "categoryPhoto") {
//       cb(null, path.join(__dirname, "/public/photo/CategoryPhoto"));
//     }
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// export const BrandMulter = multer({ storage }).single("brandPhoto");
// export const CategoryMulter = multer({ storage }).single("categoryPhoto");

// multer for cloudinary

// multer storage for cloudinary

// const storage = multer.memoryStorage();

import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        " _ " +
        Math.round(Math.random() * 1000000) +
        " _ " +
        file.fieldname
    );
  },
});

// console.log(storage);

// multer for brand logo

export const brandMulter = multer({ storage }).single("brandLogo");
export const categoryMulter = multer({ storage }).single("categoryLogo");
export const productMulter = multer({ storage }).array("productLogo");
