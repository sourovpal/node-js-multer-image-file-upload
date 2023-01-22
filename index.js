
const multer = require("multer");
const path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })




const maxSize = 1 * 1000 * 1000;
    
  var upload = multer({ 
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: function (req, file, cb){
      
          var filetypes = /jpeg|jpg|png/;
          var mimetype = filetypes.test(file.mimetype);
    
          var extname = filetypes.test(path.extname(
                      file.originalname).toLowerCase());
          
          if (mimetype && extname) {
              return cb(null, true);
          }
        
          cb("Error: File upload only supports the "
                  + "following filetypes - " + filetypes);
        } 
    
  // mypic is the name of file attribute
  }).single("avatar"); 


app.post("/", (req, res)=>{


    upload(req,res, function(err) {
  
        if(err) {
            console.log(err);
            res.send(err)
        }
        else {
            console.log('success');
  
            res.send("Success, Image uploaded!")
        }
    })


    // tblStudent.create(req.body);
    // const { image } = req.files;
    // avatar.mv(__dirname + '/uploads/' + avatar.name);
    // console.log(image)
    // res.json(req.files);
    // res.end("test");
});

















