import { Router } from "express";
const router = Router();
import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/img");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(".");
    cb(
      null,
      Date.now() + Math.random() * 10000 + "." + filename[filename.length - 1]
    );
  },
});
const upload = multer({ storage: storage });

router.post("/img", async (req, res) => {
  upload.single("img")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.status(400).send({ message: "Lỗi upload hình ảnh!" });
    } else if (err) {
      res.status(400).send({ message: "Lỗi upload hình ảnh!" });
    }
    const mime = ["image/gif", "image/jpeg", "image/png", "image/svg+xml"];
    if (!mime.includes(req.file?.mimetype)) {
      res.status(400).send({ mesage: "Chỉ upload được file ảnh!" });
    } else {
      res
        .status(200)
        .send({ data: req.file.destination + "/" + req.file.filename });
    }
  });
});

export default router;
