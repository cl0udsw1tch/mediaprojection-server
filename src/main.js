const express = require('express');
const path = require("path")
const fs = require("fs")
const app = express();
const port = 3000;
const serveIndex = require('serve-index');



app.use("/uploads", express.static(path.join(__dirname, "../", 'uploads')), serveIndex(path.join(__dirname, "../", 'uploads'), { 
    icons: true // Enable icons for files
}));

app.post('/upload55019283475', express.raw({ type: 'application/octet-stream', limit: '20mb' }), (req, res) => {
    console.log("Connection made to uploads")
  const imageData = req.body;  
  const imagePath = path.join(__dirname, "../", 'uploads', `image_${Date.now()}.jpg`);
  console.log(imagePath)

    var fileCount = 0;
  fs.readdir(path.join(__dirname, "../", 'uploads'), (err, files) => {
    if (err) {
        return console.error('Unable to scan directory: ' + err);
    }
    
     fileCount = files.length; // Count all entries since they are all files
    console.log(`Number of files in the directory: ${fileCount}`);
});

if (fileCount < 50) {

    fs.writeFile(imagePath, imageData, (err) => {
      if (err) {
        console.error('Error saving image:', err);
        return res.status(500).send('Error saving image');
      }
      res.send('Image saved successfully');
    });
} else {
    res.send('Image not saved, directory full.');
}
});

  app.listen(3112, () => {
    console.log('Server is running on http://localhost:', 3112);
  });