import multer from 'multer'
//cấu hình lưu trữ file khi upload xong
var multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    //files khi upload xong sẽ nằm trong thư mục "uploads" này - có thể tự định nghĩa thư mục này
    cb(null, 'uploads')
  },
  // tạo tên file
  filename: function (req, file, cb) {

    const ext = file.mimetype.split("/")[1];
    const nameFile = file.originalname.split(".")[0]
    
    cb(null, `${nameFile}-${Date.now()}.${ext}`);
  }
})

// Chi chon file co duoi la png
const multerFilter = (req, file, cb) => {
  var ext = file.mimetype.split("/")[1]
  if (ext === "jpg" | ext === "jpeg" | ext === "png") {
    cb(null, true);
  } else {
    cb(new Error("Not a image File!!"), false);
  }
};

const uploadFile = (req, res, next) => {
  //Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
  var upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  
  const up = upload.single('formFile')
  
  up(req, res, function (err) {
    if (req.file) {
      if (err instanceof multer.MulterError) {
        res.status(400).json("error upload file1")
      } else if (err) {
        res.status(400).json("error upload file2")
      }
      // Everything went fine. 
      next()
    } else {
      res.status(400).json("error upload file3")
    }

  })
}

const updateFile = (req, res, next) => {
  //Khởi tạo middleware với cấu hình trên, lưu trên local của server khi dùng multer
  var update = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  const up = update.single('updateFile')
  up(req, res, function (err) {
    if (req.file) {
      if (err instanceof multer.MulterError) {
        res.status(400).json("error upload file 1")
      } else if (err) {
        res.status(400).json("error upload file 2")
      }
    }

    next()
  })
}

export { uploadFile, updateFile }