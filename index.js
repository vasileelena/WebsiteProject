const express = require('express');

app = express();

app.set("view engine", "ejs");
app.use("/resources", express.static(__dirname + "/resources"));

app.get("/", function(req, res){
  console.log(req.url);
  res.render("pagini/index.ejs"); //calea e relativa la folderul views
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
