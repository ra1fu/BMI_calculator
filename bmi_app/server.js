const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);  
  const heightCm = parseFloat(req.body.height);

  if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
    return res.render("result.html", {
      bmi: "Invalid input",
      category: "Please enter positive numbers",
      color: "gray"
    });
  }

  const height = heightCm / 100;

  const bmi = weight / (height * height);

  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "blue";
  } else if (bmi < 25) {
    category = "Normal weight";
    color = "green";
  } else if (bmi < 30) {
    category = "Overweight";
    color = "orange";
  } else {
    category = "Obese";
    color = "red";
  }

  res.render("result.html", {
    bmi: bmi.toFixed(2),  
    category: category,
    color: color
  });
});

app.listen(3000, () => {
  console.log("The server is running http://localhost:3000");
});
