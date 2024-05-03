var apptF1 = document.querySelector("[type-logement='appt-f1']");
var apptF2 = document.querySelector("[type-logement='appt-f2']");
var apptF3 = document.querySelector("[type-logement='appt-f3']");
var apptF4 = document.querySelector("[type-logement='appt-f4']");
var apptF5 = document.querySelector("[type-logement='appt-f5']");
var apptF6 = document.querySelector("[type-logement='appt-f6']");
var apptST1 = document.querySelector("[type-logement='appt-st1']");

var pavT2 = document.querySelector("[type-logement='pav-t2']");
var pavT3 = document.querySelector("[type-logement='pav-t3']");
var pavT4 = document.querySelector("[type-logement='pav-t4']");
var pavT5 = document.querySelector("[type-logement='pav-t5']");
var pavT6 = document.querySelector("[type-logement='pav-t6']");
var pavT7 = document.querySelector("[type-logement='pav-t7']");
var pavT8 = document.querySelector("[type-logement='pav-t8']");

var type_de_bien = document.getElementById("nature_du_bien");

type_de_bien.addEventListener("change", function (e) {
  if (e.target.value === "non-meuble") {
    console.log("non-meuble");
    // appartement
    apptF1.setAttribute("min", 91);
    apptF2.setAttribute("min", 97);
    apptF3.setAttribute("min", 102);
    apptF4.setAttribute("min", 108);
    apptF5.setAttribute("min", 118);
    apptF6.setAttribute("min", 129);
    apptST1.setAttribute("min", 85);
    // pavillon
    pavT2.setAttribute("min", 111);
    pavT3.setAttribute("min", 130);
    pavT4.setAttribute("min", 150);
    pavT5.setAttribute("min", 180);
    pavT6.setAttribute("min", 210);
    pavT7.setAttribute("min", 250);
    pavT8.setAttribute("min", 280);
  } else if (e.target.value === "meuble") {
    console.log("meuble");
    // appartement
    apptF1.setAttribute("min", 137);
    apptF2.setAttribute("min", 147);
    apptF3.setAttribute("min", 153);
    apptF4.setAttribute("min", 162);
    apptF5.setAttribute("min", 177);
    apptF6.setAttribute("min", 194);
    apptST1.setAttribute("min", 128);
    // pavillon
    pavT2.setAttribute("min", 167);
    pavT3.setAttribute("min", 195);
    pavT4.setAttribute("min", 225);
    pavT5.setAttribute("min", 270);
    pavT6.setAttribute("min", 315);
    pavT7.setAttribute("min", 375);
    pavT8.setAttribute("min", 420);
  }
});

(function () {
    apptF1.setAttribute("min", 91);
    apptF2.setAttribute("min", 97);
    apptF3.setAttribute("min", 102);
    apptF4.setAttribute("min", 108);
    apptF5.setAttribute("min", 118);
    apptF6.setAttribute("min", 129);
    apptST1.setAttribute("min", 85);
    // pavillon
    pavT2.setAttribute("min", 111);
    pavT3.setAttribute("min", 130);
    pavT4.setAttribute("min", 150);
    pavT5.setAttribute("min", 180);
    pavT6.setAttribute("min", 210);
    pavT7.setAttribute("min", 250);
    pavT8.setAttribute("min", 280);
  })();