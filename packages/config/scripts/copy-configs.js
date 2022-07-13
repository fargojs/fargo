const fs = require('fs');

fs.readdir('./src/configs', (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fs.copyFile(`./src/configs/${file}`, `./dist/configs/${file}`, (err) => {
      if (err) throw err;
    });
  });
});
