const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const exifReader = require('exif-reader');

const directoryPath = '/path/to/pictures';

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log('Error getting directory information.', err);
    return;
  }

  files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    sharp(filePath)
      .metadata()
      .then(metadata => {
        if (metadata.exif) {
          const exif = exifReader(metadata.exif);
          console.log(exif)
        //   if (exif && exif.DateTimeOriginal) {
        //     const dateTaken = new Date(exif.DateTimeOriginal).toISOString().replace(/:/g, '-').replace(/T/, '_').replace(/\..+/, '');
        //     const newFileName = `${dateTaken}${path.extname(file)}`;
        //     const newFilePath = path.join(directoryPath, newFileName);

        //     fs.rename(filePath, newFilePath, err => {
        //       if (err) console.log('Error renaming file:', err);
        //       else console.log(`${file} renamed to ${newFileName}`);
        //     });
        //   }
        }
      })
      .catch(err => console.log('Error reading file metadata:', err));
  });
});