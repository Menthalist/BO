var next = ""
var prev = ""
var max = 0;


function filtreRdv() {
  $("#waiters").css("display","inline")
  var i = 1;
  data = {};
  message = "Rendez-vous répondant aux critères suivant; ";
  if ($("#etat").val() != "0") {
    data["statut"] = $("#etat").val();
    message = message + "statut: <strong> " + $("#etat option:selected").text()+" </strong>";
  }

  if ($("#filtre_manuelle").val()) {
    data["valeur"] = $("#filtre_manuelle").val();
    message = message + "Saisie manuelle: <strong> " + $("#filtre_manuelle").val()+" </strong>";
  }

  if ($("#debut").val() != "") {
    data["debut"] = $("#debut").val();
    var formattedDate = new Date($("#debut").val());
    var d = formattedDate.getDate();
    var m = formattedDate.getMonth();
    m += 1; // JavaScript months are 0-11
    var y = formattedDate.getFullYear();
    message =
      message +
      " date debut: <strong> " +
      String(d).padStart(2, "0") +
      "/" +
      String(m).padStart(2, "0") +
      "/" +
      y+" </strong>";
  }
  if ($("#fin").val() != "") {
    data["fin"] = $("#fin").val();
    var formattedDate = new Date($("#fin").val());
    var d = formattedDate.getDate();
    var m = formattedDate.getMonth();
    m += 1; // JavaScript months are 0-11
    var y = formattedDate.getFullYear();
    message =
      message +
      " date fin: <strong> " +
      String(d).padStart(2, "0") +
      "/" +
      String(m).padStart(2, "0") +
      "/" +
      y+" </strong>";
  }

  if ($.cookie("group") == "Salarie") {
    data["salarie"] = $.cookie("id_logged_user_user");
    message =
      message + " passeur : <strong> " + $("#passeur_val option:selected").text()+" </strong>";
  }
  if( $.cookie("group") == "Agent constat"){
    data["ac"] = $.cookie("id_logged_user_user");
    if ($("#client_val").val() != 0) {
      data["client"] = $("#client_val").val();
      message = message + " client: <strong> " + $("#client_val option:selected").text()+" </strong>";
    }
    if ($("#role").val() != 0) {
      data["role"] = $("#role").val();
      message = message + " role: <strong> " + $("#role option:selected").text()+" </strong>";
    }

  }
  if ( $.cookie("group") == "Agent secteur") {

    data["agent"] = $.cookie("id_logged_user_user");

    if ($("#client_val").val() != 0) {
      data["client"] = $("#client_val").val();
      message = message + " client: <strong> " + $("#client_val option:selected").text()+" </strong>";
    }

    if ($("#role").val() != 0) {
      data["role"] = $("#role").val();
      message = message + " role: <strong> " + $("#role option:selected").text()+" </strong>";
    }
  }
  if ($.cookie("group") == "Administrateur" || $.cookie("group") == "Audit planneur")
   {
    if ($("#client_val").val() != 0) {
      data["client"] = $("#client_val").val();
      message = message + "client: <strong> " + $("#client_val option:selected").text()+" </strong>";
    }

    if ($("#agent_val").val() != 0) {
      data["agent"] = $("#agent_val").val();
      message = message + " agent: <strong> " + $("#agent_val option:selected").text()+" </strong>";
    }

    if ($("#passeur_val").val() != 0) {
      data["salarie"] = $("#passeur_val").val();
      message =
        message + " passeur : <strong> " + $("#passeur_val option:selected").text()+" </strong>";
    }
  }

  if (
    $.cookie("group") == "Client pro" ||
    $.cookie("group") == "Client particulier"
  ) {
    data["client"] =$.cookie('id_logged_user_user');
  }
  data["user"] = data["role"] = $.ajax({
    type: "GET",
    url: tri_url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
    success: function (response) {
      max_ = Math.round(parseInt(response["count"]) / 10) + 1;
      next = response["next"]
      prev = response["previous"]
      $("#contentTableRdv").empty();
      response["results"].forEach((elt) => {
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
        var intervention = "Non Assignée"
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
            <td><span class="badge badge-primary">' +elt["propriete"]["type_propriete"]["type"] +"</span></td>\
            <td>" +elt["propriete"]["ville"]+"</td>\
            <td><a  onclick='goWhereEdit(" +elt["id"] +')\' ><i class="bi bi-pencil-square"style="color: rgb(0, 0, 0)"></i></a>&nbsp;<a onclick=\'goWhereEdit1(' +elt["id"] +')\'><i class="fa fa-calendar" aria-hidden="true" style="color: rgb(136, 102, 119)"></i></a></td>\
            </tr>'
        );

        i++;
      });
      $("#text_ok").text("");
      $("#text_ok").html(message);
      $("#result").css("display", "inline");
	    $("#waiters").css("display","none")
    },
    error: function (response) {
      alert("Echec de récupération des rendez-vous");
    },
  });
}



$("#find").on("click", function () {
  cas_rdv = 1
  filtreRdv();
});
function getClientF() {
  var content = "";
  $.ajax({
    type: "GET",
    url: client_add_not_pg,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      content = "<option value='0'>***********************</option>";
      var r = "";
      if (typeof response["results"] === "undefined") {
        r = response;
      } else {
        r = response["results"];
      }
      r.forEach((elt) => {
        content =
          content +
          "<option value = " +
          elt["user"]["id"] +
          ">" +
          elt["societe"] +
          " --- " +
          elt["user"]["nom"] +
          " " +
          elt["user"]["prenom"] +
          "</option>";
      });
      $("#client").empty();
      $("#client").append(
        "<select  class='form-select form-control form-select-lg' id='client_val'> " +
          content +
          "</select>"
      );
    },
    error: function (response) {
      console.log(response);
    },
  });
  if (
    $.cookie("group") == "Client particulier" ||
    $.cookie("group") == "Client pro"
  ) {
    content = "<option value='0'>***********************</option>";
    content =
      content +
      "<option value = " +
      $.cookie("id_user_logged") +
      ">" +
      $.cookie("name") +
      " " +
      $.cookie("first_name") +
      "</option>";
    $("#client").empty();
    $("#client").append(
      "<select  class='form-select form-control form-select-lg' id='client_val'> " +
        content +
        "</select>"
    );
  }
  if ($.cookie("group") == "Salarie") {
    content = "<option value='0'>***********************</option>";
    content =
      content +
      "<option value = " +
      $.cookie("id_client_sal") +
      ">" +
      $.cookie("nom_client_sal") +
      " " +
      $.cookie("prenom_client_sal") +
      "</option>";
    $("#client").empty();
    $("#client").append(
      "<select  class='form-select form-control form-select-lg' id='client_val'> " +
        content +
        "</select>"
    );
  }
}
function getPasseurF() {
  var crt = "";
  data = {};
  if ($.cookie("group") == "Salarie") {
    crt =
      "<option value = " +
      $.cookie("id_logged_user_user") +
      ">" +
      $.cookie("name") +
      "  " +
      $.cookie("first_name") +
      "</option>";
    $("#passeur").empty();
    $("#passeur").append(
      " <label for='exampleInputEmail1'>Passeur</label>\
          <select  class='form-select form-control form-select-lg' id='passeur_val'> " +
        crt +
        "</select>"
    );
    var content = "";
    content = "<option value='0'>***********************</option>";
    content =
      content +
      "<option value = " +
      $.cookie("id_client_sal") +
      ">" +
      $.cookie("nom_client_sal") +
      " " +
      $.cookie("prenom_client_sal") +
      "</option>";
    $("#client").empty();
    $("#client").append(
      "<select  class='form-select form-control form-select-lg' id='client_val'> " +
        content +
        "</select>"
    );
    return;
  }
  if (
    $.cookie("group") == "Agent secteur" ||
    $.cookie("group") == "Agent constat" ||
    $.cookie("group") == "Audit planneur"
  ) {
    data["agent"] = $.cookie("id_user_logged");
    //alert($.cookie('id_user_logged'))
  }

  if ($.cookie("group") == "Client pro") {
    data["client"] = $.cookie("id_user_logged");
  }
  $.ajax({
    type: "GET",
    url: salarie_add_not_pg,
    data: data,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
    success: function (response) {
      content =
        "<option value='0'>****************************************</option>";
      response.forEach((elt) => {
        content =
          content +
          "<option value = " +
          elt["user"]["id"] +
          ">" +
          elt["user"]["nom"] +
          "  " +
          elt["user"]["prenom"] +
          "</option>";
      });
      $("#passeur").empty();
      $("#passeur").append(
        " <label for='exampleInputEmail1'>Passeur</label>\
                    <select  class='form-select form-control form-select-lg' id='passeur_val'> " +
          content +
          "</select>"
      );
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getAgentF() {
  data = {};
  url = asurl_not_paginated	
  if (
    $.cookie("group") == "Agent secteur" ||
    $.cookie("group") == "Agent constat" ||
    $.cookie("group") == "Audit planneur"
  ) {
    data["agent"] = $.cookie("id_user_logged");
  }
  if($.cookie('group')=="Administrateur"){
    url = url +"&for_rdv=ok"
  }	
  $.ajax({
    type: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
    success: function (response) {
      //console.log(response)
      content =
        "<option value='0'>****************************************</option>";
        var r
        if(typeof(response['results'])==="undefined"){
          r = response
        }else{
          r = response['results']
        }
      r.forEach((elt) => {
        content =
          content +
          "<option value = " +
          elt["user"]["id"] +
          ">" +
          elt["user"]["nom"] +
          "  " +
          elt["user"]["prenom"] +
          "</option>";
      });

      $("#agent").empty();
      $("#agent").append(
        " <label for='exampleInputEmail1'>Agent de secteur</label>\
            <select class='form-select form-control form-select-lg' id='agent_val'> " +
          content +
          "</select>"
      );
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function onload() {
  if ($.cookie("group") == "Administrateur") {
    getClientF();
    getAgentF();
    getPasseurF();
    /*$('#role_group').empty()
      $('#role_group').css("display",'none')*/
  }
  if (
    $.cookie("group") == "Agent secteur" ||
    $.cookie("group") == "Agent constat" ||
    $.cookie("group") == "Audit planneur"
  ) {
    getClientF();
    getAgentF();
    getPasseurF();
  }
  if ($.cookie("group") == "Client pro") {
    getPasseurF();
  }
  if ($.cookie("group") == "Salarie") {
    getPasseurF();
  }
}

function filtresKeyUpRDV(){
  data = {}
  if($.cookie('group')=="Agent secteur"){
    data['as'] = $.cookie('id_logged_user_user')
  }
  if($.cookie('group')=="Agent constat"){
    data['ac'] = $.cookie('id_logged_user_user')
  }
  if($.cookie('group')=="Client pro" || $.cookie('group')=="Client particulier") {
    data['cl'] = $.cookie('id_logged_user_user')
  }
  if($.cookie('group')=="Salarie") {
    data['sal'] = $.cookie('id_logged_user_user')
  }
  data['valeur'] = $('#filtre_manuelle').val()

  $.ajax({
    type: "GET",
    url: filtre_rdv_url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
    success: function (response) {
      max_ = Math.round(parseInt(response["count"]) / 10) + 1;
      next = response["next"]
      prev = response["previous"]
      $("#contentTableRdv").empty();
      var i = 1
      response["results"].forEach((elt) => {
        var formattedDate = new Date(elt["date"]);
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
        hr = formattedDate.getHours()
        min_ =formattedDate.getMinutes()
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
        var intervention = "Non Assignée"
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
            <td><span class="badge badge-primary">' +elt["propriete"]["type_propriete"]["type"] +"</span></td>\
		<td>" +elt["propriete"]["ville"]+"</td>\
            <td><a  onclick='goWhereEdit(" +elt["id"] +')\' ><i class="bi bi-pencil-square"style="color: rgb(0, 0, 0)"></i></a>&nbsp;<a onclick=\'goWhereEdit1(' +elt["id"] +')\'><i class="fa fa-calendar" aria-hidden="true" style="color: rgb(136, 102, 119)"></i></a></td>\
            </tr>'
        );

        i++;
      });
      $('#waiters').css("display", "none");
    },
    error: function (response) {
      $('#waiters').css("display", "none");
      alert("Echec de récupération des rendez-vous");
    },
  });
}
$('#findMan').on('click',function(){
  $('#waiters').css("display", "inline");
  filtresKeyUpRDV()
})
