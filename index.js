const express = require('express');
const fs = require('fs');
const sharp = require('sharp');
const {Client} = require('pg');

app = express();

app.set("view engine", "ejs");

var client = new Client({user:'elena', password:'elena', host:'localhost', port:5432, database:'proiect'});
client.connect();

app.use("/resources", express.static(__dirname + "/resources"));

function createImages() {
  var buf = fs.readFileSync(__dirname + "/resources/json/galerie.json").toString("utf-8");
  obImagini = JSON.parse(buf);

  let dim_mic = 150;
  let dim_mediu = 250;

  for (let imag of obImagini.imagini){
    [nume_imag, extensie] = imag.cale_imagine.split(".");
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

var categorii;

client.query("select distinct tip_produs from produse", function(err, rez){
  console.log(rez.rows);
  categorii = rez.rows;
});

createImages();

app.get(["/index", "/"], function(req, res){
  console.log(req.url);
  console.log(req.ip);

  imagArray = obImagini.imagini;
  // -------galerie
  var date = new Date();
  var minute = date.getMinutes();
  var sfert = 0;

  if(minute <= 15){
    sfert = 1;
  }
  else if (minute <= 30) {
    sfert = 2;
  }
  else if (minute <= 45) {
    sfert = 3;
  }
  else {
    sfert = 4;
  }

  imagArrayFiltered = imagArray.filter(function (imag){
    return imag.sfert_ora == sfert;
  } );

  console.log(imagArrayFiltered)

  res.render("pagini/index.ejs", {ip:req.ip, imagini:imagArrayFiltered, cale:obImagini.cale_galerie, categorii:categorii});

  //calea e relativa la folderul views
});

app.get(["/produse"], function(req, res){
  console.log(req.query);

  var conditie = "where 1=1";
  if (req.query.tip) {
    conditie += ` and tip_produs ='${req.query.tip}'`;
  }
  var categorii_mici;
  client.query("select distinct categorie from produse", function(err, rez){
    categorii_mici = rez.rows;
    console.log(categorii_mici);
  })
  client.query(`select * from produse ${conditie}`, function(err, rez){
    res.render("pagini/produse.ejs", {produse:rez.rows, categorii:categorii, categ_mici: categorii_mici});
  });


});

app.get(["/produs/:id"], function(req, res){
  console.log(req.params);

  client.query(`select * from produse where id=${req.params.id}`, function(err, rez){
    res.render("pagini/produs.ejs", {prod:rez.rows[0], categorii:categorii});
  });


});

app.get(["/galerie_produse"], function(req, res){
  console.log(req.url);

  res.render("pagini/galerie_produse.ejs", {imagini:imagArrayFiltered, cale:obImagini.cale_galerie, categorii:categorii}); //calea e relativa la folderul views
});

app.get("/ceva", function(req, res){
  console.log(req.url);
  res.write("Pagina2");
  res.end();
});

app.get("/*", function(req, res){
  console.log(req.url);
  res.render("pagini" + req.url, {categorii:categorii}, function(err, rezultatRandare){ //calea e relativa la folderul views
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
