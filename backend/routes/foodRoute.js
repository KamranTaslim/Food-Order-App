import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/foodController.js";
import multer from "multer";

const foodRoute = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = now.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return cb(null, `${formattedDate} ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRoute.post("/add", upload.single("image"), addFood);
foodRoute.get("/list", listFood);
foodRoute.post("/remove", removeFood);

export default foodRoute;
