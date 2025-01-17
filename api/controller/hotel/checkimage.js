const multer = require('multer');
const config = require('config');
const path=require('path');
const dir=path.join(__dirname+"../../../../");
const storage = multer.diskStorage({
    destination: function(request, file, cb) {
      cb(null,dir+"/api/uploads/");
    },
    filename: function(request, file, cb) {
      cb(null,file.originalname);
    }
  });
  const fileFilter = (req, file, cb) => {
      // reject a file
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };
    
    const upload = multer({
      storage: storage,    
      limits: {
        fileSize: 1024 * 1024 * 10
      },
      fileFilter: fileFilter
    });
module.exports=upload;