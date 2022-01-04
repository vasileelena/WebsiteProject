const express = require('express');
const fs = require('fs');
const sharp = require('sharp');

app = express();

app.set("view engine", "ejs");
app.use("/resources", express.static(__dirname + "/resources"));

function createImages() {
  var buf = fs.readFileSync(__dirname + "/resources/json/galerie.json").toString("utf-8");
  obImagini = JSON.parse(buf);

  let dim_mic = 150;
  let dim_mediu = 250;

  for (let imag of obImagini.imagini){
    [nume_imag, extensie] = imag.fisier.split(".");
    console.log(nume_imag, extensie);
    //cream o proprietate noua pt fiecare ob imagine din vector
    imag.mic = `${obImagini.cale_galerie}/mic/${nume_imag}-${dim_mic}.webp`;
    imag.mediu = `${obImagini.cale_galerie}/mediu/${nume_imag}-${dim_mediu}.webp`;
    imag.mare = `${obImagini.cale_galerie}/${nume_imag}.png`;
    //facem resize pt fiecare
    if(!fs.existsSync(imag.mic)){
      sharp(__dirname + "/" + imag.mare).resize(dim_mic).toFile(__dirname + "/" + imag.mic);
    }
    if(!fs.existsSync(imag.mediu)){
      sharp(__dirname + "/" + imag.mare).resize(dim_mediu).toFile(__dirname + "/" + imag.mediu);
    }
  }
}

createImages();

app.get(["/", "/index"], function(req, res){
  console.log(req.url);
  console.log(req.ip);

  // -------galerie

  res.render("pagini/index.ejs", {ip:req.ip, imagini:obImagini.imagini, cale:obImagini.cale_galerie}); //calea e relativa la folderul views
});

app.get("/ceva", function(req, res){
  console.log(req.url);
  res.write("Pagina2");
  res.end();
});

app.get("/*", function(req, res){
  console.log(req.url);
  res.render("pagini" + req.url, function(err, rezultatRandare){ //calea e relativa la folderul views
    console.log(err);
    if(err) {
      res.render("pagini/404");
    }
    else {
      console.log(rezultatRandare);
      res.send(rezultatRandare);
    }
  });
});

app.listen(8080);
console.log("Serverul a pornit!");
