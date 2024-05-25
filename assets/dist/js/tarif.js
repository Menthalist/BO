var pg = "";
var k = 0;
var max = 0;
var next = ""
var prev = ""
let listeLogementType=[];
let logementEnCours = {};

function getTypeLogement(){
  $.ajax({
    type: "GET",
    url: 'http://195.15.218.172/edlgateway/api/v1/logement/type_log/all?start=12&limit=12&count=12&category=tre',
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      content = "<option value='0'>SELECTIONNER</option>";
      if(typeof(response["results"])==="undefined"){
        listeLogementType = null
      }else{
        listeLogementType = response['results']
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
}



function getAllTarif() {
  // Appel de la fonction pour récupérer les types de logement
  getTypeLogement();

  // Affichage de l'indicateur de chargement
  $("#waiters").css("display", "inline");

  // Requête AJAX pour récupérer les tarifs
  $.ajax({
    type: "GET",
    url: tarif_add,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      var i = 1;
      max_ = Math.round(parseInt(response["count"]) / 10) + 1;
      next = response["next"];
      prev = response["previous"];
      $("#total").text(max_);
      $("#contentTableTarif").empty();
      response.forEach((elt) => {
        // Récupération du type de logement associé au tarif
        /*var type = "";
        if (listeLogementType != null) {
          logementEnCours = listeLogementType.find(elem => elem.id.toString() === elt["propriete"]["type"].toString());
        }
        if (typeof logementEnCours === "undefined") {
          type = elt["propriete"]["type_propriete"]["type"];
        } else {
          type = logementEnCours["nom"];
        }*/

        //id_toget = elt["elt"]["id"];

        // Formatage de la date
        /*var formattedDate = new Date(elt["date"]);
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth() + 1; // JavaScript months are 0-11
        var y = formattedDate.getFullYear();*/

        // Ajout d'une ligne au tableau HTML pour chaque tarif
        $("#contentTableTarif").append(

          '<tr>\
            <td>' +i + "</td>\
            <td>" +elt["ref_client"]+"</td>\
            <td>" +elt["nature_bien_text"] +"</td>\
            <td>" +elt["taux_meuble"]+"</td>\
            <td>" +elt["edl_prix_std"] +"</td>\
            <td><a onclick=\"goWhereEdit('"+elt["id"] +"')\"><i class=\"bi bi-pencil-square\"style=\"color: rgb(0, 0, 0)\"></i></a>&nbsp;<a onclick=\"goWhereEdit1('" +elt["id"] +"'\")><i class=\"fa fa-calendar\" aria-hidden=\"true\" style=\"color: rgb(136, 102, 119)\"></i></a></td>\
          </tr>"
        );
        i++;
      });
      $("#waiters").css("display", "none");
    },
    error: function (response) {
      console.log(response);
    },
  });
}

$("#next").on("click", function () {
   if(next===null){
    alert("Dernière page");
    return;
  }
  v = next.split("?")[1]
  if(cas_rdv == 1){
    url = tri_url + "?"+v
  }else{
    url = rdv_add + "?"+v
  }
  if (k <= max_) {
    k = k + 1;
    code(url);
    $("#actuel").text("");
    $("#actuel").text(k);
  } else if (k == max_) {
    code(url);
    $("#actuel").text("");
    $("#actuel").text(k);
  } else {
    alert("Dernière page");
    return;
  }
});
$("#prev").on("click", function () {
  if(prev===null){
    alert("Dernière page");
    return;
  }
  v = prev.split("?")[1]
  if(cas_rdv == 1){
    url = tri_url + "?"+v
  }else{
    url = rdv_add + "?"+v
  }	
  if (k == 0) {
    alert("Première page");
  }
  if (k < max_ && k > 0) {
    k = k - 1;
    code(url);
    $("#actuel").text("");
    $("#actuel").text(k);
  }
  if (k == max_) {
    k = k - 1;
    code(url);
    $("#actuel").text("");
    $("#actuel").text(k);
  }
});
function getPrev(url_) {
  code(url_);
}
function getNext() {
    if(next===null){
    alert("Dernière page");
    return;
  } 
  v = next.split("?")[1]
  if(cas_rdv == 1){
    url = tri_url + "?"+v
  }else{
    url = rdv_add + "?"+v
  }
	
  if (i <= max_) {
    code(url);
  } else {
    alert("Dernière page");
    return;
  }
}
function code(url_) {
  $.ajax({
    type: "GET",
    url: url_,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      var i = 1;
      max_ = Math.round(parseInt(response["count"]) / 10);
      next = response["next"]
      prev = response["previous"]
      $("#total").text(max_);
      $("#contentTableRdv").empty();
      response["results"].forEach((elt) => {
        var type = "";
        if(listeLogementType != null){
          logementEnCours = listeLogementType.find(elem => elem.id.toString() === elt["propriete"]["type"].toString())
        }
        if((typeof logementEnCours ).toString()== "undefined"){
          type = elt["propriete"]["type_propriete"]["type"] ;
        }else{
          console.log(typeof logementEnCours)  
          type = logementEnCours["nom"]
        }
        var formattedDate = new Date(elt["date"]);
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
	var hr = formattedDate.getHours()-1
        var min_ =formattedDate.getMinutes()      
        m += 1; // JavaScript months are 0-11
        var y = formattedDate.getFullYear();

        var couleur;
        if (parseInt(elt["statut"]) == 1) {
          couleur = "rgb(241, 67, 67)";
        }
        if (parseInt(elt["statut"]) == 2) {
          couleur = "rgb(255, 166, 93)";
        }
        if (parseInt(elt["statut"]) == 3) {
          couleur = "rgb(93, 182, 255)";
        }
        if (parseInt(elt["statut"]) == 4) {
          couleur = "rgb(93, 255, 101)";
        }
	var intervention="Non Assignée"      
	if(elt["intervention"] != null){
          intervention = elt["intervention"]["type"]
        }      
        $("#contentTableRdv").append(
          '<tr style="background-color:' +couleur +'; color:white;">\
            <td>' +i + "</td>\
            <td>" +String(d).padStart(2, "0") +"/" +String(m).padStart(2, "0") +"/" +y +" "+String(hr).padStart(2, "0")+"h:"+String(min_).padStart(2, "0")+"</td>\
            <td>" +elt["client"]["societe"] +"</td>\
            <td>" +elt["ref_lot"] +"</td>\
            <td>" +elt["agent"]["trigramme"] +"</td>\
            <td>" +elt["id"] +'</td>\
            <td>' +elt["propriete"]["bailleur"]["nom"] +" "+elt["propriete"]["bailleur"]["prenom"]+'</td>\
            <td>' +elt["propriete"]["locataire"]["nom"] +" "+ elt["propriete"]["locataire"]["prenom"]+'</td>\
            <td> <span class="badge badge-success">' +intervention +'</span></td>\
            <td><span class="badge badge-primary">' +type +"</span></td>\
		<td>" +elt["propriete"]["ville"]+"</td>\
            <td><a  onclick='goWhereEdit(" +elt["id"] +')\' ><i class="bi bi-pencil-square"style="color: rgb(0, 0, 0)"></i></a>&nbsp;<a onclick=\'goWhereEdit1(' +elt["id"] +')\'><i class="fa fa-calendar" aria-hidden="true" style="color: rgb(136, 102, 119)"></i></a></td>\
            </tr>'
        );
        i++;
      });
    },
    error: function (response) {
      console.log(response);
    },
  });
}
function goWhereEdit(id) {
  $.cookie("tarif_to_edit", id);
  window.location.replace("modifierTarif.html");
}
function goWhereEdit1(id) {
  /*$.cookie("rdv_to_edit", id);
  window.location.replace("plannification.html");*/
}
