let listeClient =[];
let listeLogementClient = [];
let typeLogement = [];
let clientForWork = {};
let casLogement = 0;
var clientFor =""; 
let logementForEdit = {};
$("#telephone_locataire").keyup(function () {
  var min = $("#telephone_locataire").val();
  min = min.toString();
  if (min.length < 10 || min.length > 10 || min.charAt(0) != "0") {
    $("#erreurPhone").css("display", "inline");
    $("#goSave").css("display", "none");
    $("#goEdit").css("display", "none");
  } else {
    $("#erreurPhone").css("display", "none");
    $("#goSave").css("display", "inline");
    $("#goEdit").css("display", "inline");
  }
});
function getClient(cas = 0, val_ = 1) {
  $.cookie("client_to_get",cas)
  if ($.cookie("group") == "Salarie" && $.cookie("id_client_sal") == 0) {
    alert("Désolé vous n'êtes attaché à aucun client vous ne pouvez pas prendre de commande\nveuillez contacter un administrateur");
    window.location.replace("dashboard.html");
    return;
  }

  if ($.cookie("group") == "Administrateur" || $.cookie("group") == "Agent secteur" || $.cookie("group") == "Agent constat" ||$.cookie("group") == "Audit planneur") {
    $.ajax({
      type: "GET",
      url: client_add_not_pg,
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (response) {
        content = "<option value='0'>SELECTIONNER</option>";
        var r = "";
        if (typeof response["results"] === "undefined") {
          r = response;
        } else {
          r = response["results"];
          listeClient = response["results"];
        }
        r.forEach((elt) => {
          content =
            content +
            "<option value = " +
            elt["user"]["id"] +
            ">" +
            elt["societe"] +
            " " +
            elt["user"]["nom"] +
            " --- " +
            elt["user"]["prenom"] +
            "</option>";
        });
        $("#client").empty();
        $("#client").append(
          " <label for='exampleInputEmail1'>Client</label>\
            <select onchange='getPasseur()' required class='form-select form-control form-select-sm' id='client_val'> " +
            content +
            "</select>"
        );
        if (cas != 0) {
          $("#client").empty();
          $("#client").append(
            " <label for='exampleInputEmail1'>Client</label>\
                        <select class='form-select form-control form-select-sm' id='client_val'> " +
              content +
              "</select>"
          );
          $("#client_val").val(cas).change();
        }
        if (val_ != 1) {
          $("#client").empty();
          $("#client").append(
            " <label for='exampleInputEmail1'>Client</label>\
                        <select  class='form-select form-control form-select-sm' id='client_val'> " +
              content +
              "</select>"
          );
        }
      },
      error: function (response) {
        
      },
    });
  }
  if ($.cookie("group") == "Client pro" || $.cookie("group") == "client particulier") {
    content = $.cookie("name") + " " + $.cookie("first_name");
    $("#client").empty();
    $("#client").append(
      "<label for='exampleInputEmail1'>Client</label>\
        <input readonly=''  class='form-select form-control ' value= '" +
        content +
        "'/>"
    );
    getPasseur((cas = 0));
  }
  if($.cookie("group") == "Salarie"){
    content = $.cookie("nom_client_sal") + " " + $.cookie("prenom_client_sal");
    $("#client").empty();
    $("#client").append(
      "<label for='exampleInputEmail1'>Client</label>\
        <input readonly=''  class='form-select form-control ' value= '" +
        content +
        "'/>"
    );
    getLogementClient($.cookie("id_client_sal"));
    clientForWork ={
      "id":$.cookie("id_client_sal"),
      "_id": $.cookie("id_client_sal"),
      "email": $.cookie("email_client_sal"),
      "nom" : $.cookie("prenom_client_sal")+" "+ $.cookie("nom_client_sal")+"   "+$.cookie("societe_client_sal"),
      "telephone": "",
      "adresse":  ""
  }
  }
}

function getLogementClient(id,ref_logement=""){
  var url_ = "http://195.15.218.172/edlgateway/api/v1/logement/single/logement/compte_client/?ID="+id;
  $.ajax({
    type: "GET",
    url: url_,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      content = "<option value='0'>SELECTIONNER</option>";
      var r
      if(typeof(response["results"])==="undefined"){
        r = null
      }else{
        r = response['results']
        listeLogementClient = response['results']
        
      }
      if(r != null){
        r.forEach((elt) => {
          content = content +"<option value = " +elt["_id"] +">" +elt["type_log"]["nom"] +"  Batiment "+elt["batiment"]+" Référence "+elt["ref_lot_client"] +"</option>";
          });
  
        $("#ligne_maison").empty();
        $("#ligne_maison").append(
          "<select onchange='displayLogement()' class='form-select form-control form-select-sm' id='logement'> " +
            content +
            "</select>"
        );
      }else{
        $("#ligne_maison").empty();
        $("#ligne_maison").append(
          "<select  onchange='displayLogement()' class='form-select  form-control form-select-sm' id='logement'> " +
            content + "</select>");
      }
      if(ref_logement!=""){
        logementForEdit = listeLogementClient.find(elem => elem.ref_lot_client.toString()==ref_logement.toString());
        console.log(ref_logement)
        $('#logement').val(logementForEdit["_id"]).change();
      }
      
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getPasseur(cas = 0, add = 0,client=0,clientF=0,reference_logement="") {
  var id_client = ""
  
  if(client == 0){
    id_client = $('#client_val').val();
  }else{
    id_client = client;
  }
  if($.cookie("group") == "Administrateur" || $.cookie("group") == "Agent secteur" || $.cookie("group") == "Agent constat" ||$.cookie("group") == "Audit planneur"){
    clientForWork = listeClient.find(elem => elem.user.id.toString() === $('#client_val').val().toString());
  }
  if ($.cookie("group") == "Client pro" || $.cookie("group") == "Client particulier") {
      id_client = $.cookie("id_logged_user_user");
      clientForWork ={
        "id":$.cookie('id_user_logged'),
        "_id": $.cookie('id_user_logged'),
        "email": $.cookie('email'),
        "nom" : $.cookie('first_name')+" "+ $.cookie('name')+"   "+$.cookie("societe_client_sal"),
        "telephone": $.cookie("telephone"),
        "adresse":  $.cookie("adresse")
    }
  }
  if ($.cookie("group") == "Salarie") {
    content = $.cookie("name") + " " + $.cookie("first_name");
    $("#passeur").empty();
    $("#passeur").append(
      "<label for='exampleInputEmail1'>Passeur</label>\
        <input readonly=''  class='form-select form-control ' value= '" +
        content +
        "'/>"
    );
    clientForWork ={
      "id":$.cookie("id_client_sal"),
      "_id": $.cookie("id_client_sal"),
      "email": $.cookie("email_client_sal"),
      "nom" : $.cookie("prenom_client_sal")+" "+ $.cookie("nom_client_sal")+"   "+$.cookie("societe_client_sal"),
      "telephone": "",
      "adresse":  ""
  }
    return;
  }
  if(clientF!=0){
    clientForWork=clientF;
  }
  if(reference_logement!=""){
    getLogementClient(clientForWork['id'],ref_logement=reference_logement)
  }else{
    getLogementClient(clientForWork['id'])
  }
  
  var url_ = salarie_add_not_pg+"&client="+id_client.toString()
  $.ajax({
    type: "GET",
    url: url_,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      content = "<option value='0'>SELECTIONNER</option>";
      var r
      if(typeof(response["results"])==="undefined"){
        r = response
      }else{
        r = response['results']
      }
      r.forEach((elt) => {
        content = content +"<option value = " +elt["user"]["id"] +">" +elt["user"]["nom"] +"  " +elt["user"]["prenom"] +"</option>";
        });
      $("#passeur").empty();
      $("#passeur").append(
        " <label for='exampleInputEmail1'>Passeur</label>\
                    <select  class='form-select form-control form-select-sm' id='passeur_val'> " +
          content +
          "</select>"
      );
      if (cas != 0) {
        $("#passeur").empty();
        $("#passeur").append(
          " <label for='exampleInputEmail1'>Passeur</label>\
                    <select class='form-select form-control form-select-sm' id='passeur_val'> " +
            content +
            "</select>"
        );
        $("#passeur_val").val(cas).change();
        
      }
    },
    error: function (response) {
      console.log(response);
    },
  });

  if (add != 0) {
    url3 = client_add;
    url3 = url3 + id_client.toString();
    url3 = url3 + "?specific=t";
    $.ajax({
      type: "GET",
      url: url3,
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (response) {
        $("#agent_val").val(response[0]["info_concession"]["agent_rattache"]["user"]).change();
      },
      error: function (response) {
      if ($.cookie("group") == "Client pro" || $.cookie("group") == "Client particulier") {
  
      }else{
        alert("Echec de récupération de l'agent référent selectionnez le manuellement");
      }
        
      },
    });
  }
}

function displayLogement(){
  let logement_ = listeLogementClient.find(elem => elem._id.toString() === $('#logement').val().toString());
  $('#surface_propriete').val(logement_["surface"])
  $("#type").val(logement_['type_log']['_id'])
  $("#numero_sol_propriete").val(logement_['etage'])
  $("#numero_propriete").val(logement_["numero_de_la_voie"])
  $('#numero_parking_propriete').val(logement_['parking'])
  $("#numero_cave_propriete").val(logement_['cave'])
  $("#adresse_propriete").val(logement_['adresse'])
  $("#adresse_complementaire_propriete").val(logement_['information_complementaire'])
  $("#code_postal_propriete").val(logement_['postal_code'])
  $('#ville_propriete').val(logement_['ville'])
  $("#ref_lot").val(logement_['ref_lot_client'])
}
function getAgent(cas = 1, val_ = 0,agent="") {
  if ($.cookie("group") == "Administrateur" ||$.cookie("group") == "Audit planneur") {
    $.ajax({
      type: "GET",
      url: asurl_not_paginated,
      headers: {
        Authorization: "Bearer " + token,
      },
      data:{'for_rdv':'ok'},
      success: function (response) {
        //console.log(response)
        content = "<option value='0'>SELECTIONNER</option>";
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
        if (cas != 1) {
          $("#agent").empty();
          $("#agent").append(
            " <label for='exampleInputEmail1'>Agent de secteur</label>\
                        <select  class='form-select form-control form-select-sm' id='as_val'> " +
              content +
              "</select>"
          );
        } else {
          $("#agent").empty();
          $("#agent").append(
            " <label for='exampleInputEmail1'>Agent de secteur</label>\
                        <select class='form-select form-control form-select-sm' id='agent_val'> " +
              content +
              "</select>"
          );
        }
        if (val_ != 0) {
          $("#agent").empty();
          $("#agent").append(
            " <label for='exampleInputEmail1'>Agent de secteur</label>\
                        <select  class='form-select form-control form-select-sm' id='agent_val'> " +
              content +
              "</select>"
          );
          $("#agent_val").val(val_).change();
        }
      },
      error: function (response) {
        console.log(response);
      },
    });
  }
  if ($.cookie("group") == "Agent secteur") {
    content = $.cookie("name") + " " + $.cookie("first_name");
    $("#agent").empty();
    $("#agent").append(
      "<label for='exampleInputEmail1'>Agent de secteur</label>\
            <input readonly=''  class='form-select form-control ' value= " +
        content +
        "/>"
    );
  }

  if ($.cookie("group") == "Agent constat") {
    content = $.cookie("nom_agent");
    $("#agent").empty();
    $("#agent").append(
      "<label for='exampleInputEmail1'>Agent de secteur</label>\
            <input readonly=''  class='form-select form-control ' value= " +
        content +
        "/>"
    );
  }
  if ($.cookie("group") == "Client pro" || $.cookie("group") == "Client particulier") {
    content = $.cookie("nom_agent");
    $("#agent").empty();
    $("#agent").append(
      "<label for='exampleInputEmail1'>Agent de secteur</label>\
            <input readonly=''  class='form-select form-control ' value= " +
        content +
        "/>"
    );
  }
  if($.cookie("group") == "Salarie"){
    if(agent==""){
      agent = $.cookie("nom_agent")+" "+$.cookie("prenom_agent")
      $("#agent").empty();
      $("#agent").append(
        "<label for='exampleInputEmail1'>Agent secteur</label>\
          <input readonly=''  class='form-select form-control ' value= '" +
          agent +
          "'/>"
      );
    }else{
      $("#agent").empty();
      $("#agent").append(
        "<label for='exampleInputEmail1'>Agent secteur</label>\
          <input readonly=''  class='form-select form-control ' value= '" +
          agent +
          "'/>"
      );
    }
  }
}
function getInterventionandPropriete(cas = 1, val_ = 0, val1 = 0) {
  $.ajax({
    type: "GET",
    url: intervention,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      content = "<option value='0'>SELECTIONNER</option>";
      response.forEach((elt) => {
        if (parseInt(elt["statut"]) == 1) {
          content =
            content +
            "<option value = " +
            elt["id"] +
            ">" +
            elt["type"] +
            "</option>";
        }
      });
      $("#intervention").empty();
      $("#intervention").append(
        " <label for='exampleInputEmail1'>Type Intervention</label>\
                    <select onchange='onTypeIntervention()'  class='form-select form-control form-select-md' id='intervention_val'> " +
          content +
          "</select>"
      );
      if (val_ != 0) {
        $("#intervention_val").val(val_).change();
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
  $.ajax({
    type: "GET",
    url: propriete,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      content = "<option value='0'>SELECTIONNER</option>";
      response.forEach((elt) => {
        if (parseInt(elt["statut"]) == 1) {
          content =
            content +
            "<option value = " +
            elt["id"] +
            ">" +
            elt["type"] +
            "</option>";
        }
      });
      $("#propriete").empty();
      $("#propriete").append(
        " <label for='exampleInputEmail1'>Nature du bien</label>\
                    <select  class='form-select form-control form-select-md' id='propriete_val'> " +
          content +
          "</select>"
      );
      if (val1 != 0) {
        $("#propriete_val").val(val1).change();
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
}
function addRdv() {
  
  $("#goSave").html("Enregistrement en cours...");
  data = {};
  data["nom_bailleur"] = $("#nom_bailleur").val();
  data["prenom_bailleur"] = $("#prenom_bailleur").val();
  data["email_bailleur"] = $("#email_bailleur").val();
  data["reference_bailleur"] = $("#reference_bailleur").val();
  data["nom_locataire"] = $("#nom_locataire").val();
  data["prenom_locataire"] = $("#prenom_locataire").val();
  data["email_locataire"] = $("#email_locataire").val();
  data["telephone_locataire"] = $("#telephone_locataire").val();
  data["surface_propriete"] = $("#surface_propriete").val();
  data["numero_propriete"] = $("#numero_propriete").val();
  data["numero_parking_propriete"] = $("#numero_parking_propriete").val();
  data["adresse_propriete"] = $("#adresse_propriete").val();
  data["code_postal_propriete"] = $("#code_postal_propriete").val();
  data["ville_propriete"] = $("#ville_propriete").val();
  data["adresse_complementaire_propriete"] = $(
    "#adresse_complementaire_propriete" 
  ).val();
  data["numero_cave_propriete"] = $("#numero_cave_propriete").val();
  data["numero_sol_propriete"] = $("#numero_sol_propriete").val();
  data["ref_lot"] = $("#ref_lot").val();
  data["ref_edl"] = $("#ref_edl").val();
  data["ancien_locataire"] = $("#adresse_ancien_locataire").val();
  data["intervention"] = $("#intervention_val").val();
  if ($.cookie("group") == "Agent secteur" ||$.cookie("group") == "Agent constat" ||$.cookie("group") == "Audit planneur" ||$.cookie("group") == "Administrateur") {
    data["client"] = $("#client_val").val();
  }
  data["statut"] = 1;
  data["date"] = $("#date").val();
  if ($.cookie("group") == "Client pro" || $.cookie("group") == "Client particulier" || $.cookie("group") == "Agent secteur" || $.cookie("group") == "Agent constat" || $.cookie("group") == "Audit planneur" || $.cookie("group") == "Administrateur") {
    if (!$("#passeur_val").val() || $("#passeur_val").val() == "0") {
    } else {
      data["passeur"] = $("#passeur_val").val();
    }
  }
  if ($.cookie("group") == "Agent secteur") {
    data["agent"] = $.cookie("id_logged_user_user");
  }
  if ($.cookie("group") == "Administrateur") {
    data["agent"] = $("#agent_val").val();
  }
  if ($.cookie("group") == "Audit planneur") {
    data["agent"] = $("#agent_val").val();
    data['audit_planneur'] = $.cookie("id_logged_user_user");
  }

  if (
    $.cookie("group") == "Client pro" ||
    $.cookie("group") == "Client particulier" ||
    $.cookie("group") == "Salarie"
  ) {
    data["agent"] = $.cookie("id_user_agent");
  }
  data["type_propriete"] = $("#propriete_val").val();
  data["type"] = $("#type  option:selected").text();
  data["consignes_part"] = $("#consignes_part").val();
  data["list_documents"] = $("#list_documents").val();
  data["info_diverses"] = $("#info_diverses").val();

  if ($.cookie("group") == "Client pro" || $.cookie("group") == "Client particulier") {
    data["client"] = $.cookie("id_logged_user_user");
  }
  if ($.cookie("group") == "Agent constat"){
      data['agent_constat'] = $.cookie('id_logged_user_user')
      data["agent"] = $.cookie("id_user_agent")
  }

  if ($.cookie("group") == "Salarie") {
    if ($.cookie("id_client_sal") == 0) {
      alert(
        "Désolé vous n'êtes attaché à aucun client vous ne pouvez pas prendre de commande\nveuillez contacter un administrateur"
      );
      window.location.replace("dashboard.html");
      return;
    }
    data["passeur"] = $.cookie("id_logged_user_user");
    data["client"] = $.cookie("id_user_client");
    data["agent"] = $.cookie("id_user_agent");
  }
  var dte = $("#date_sortie").val()
  if(!Date.parse(dte)){
    
  }else{
    data['dte_sortie_ancien_loc'] = $("#date_sortie").val()
  }
  $.ajax({
    type: "POST",
    url: rdv_add,
    data: data,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      $("#goSave").html("Enregistrer");
      $("#editForm").modal('hide')
      alert("RDV Ajouté avec succes");
      window.location.replace("rendez-vous_list.html");
    },
    error: function (response) {
      $("#goSave").html("Enregistrer");
      $("#editForm").modal('hide')
      alert('Echec de la modification veuillez reéssayer plus tard')

    },
  });
}

function getRdvToEdit() {
  $.ajax({
    type: "GET",
    url: rdv_add + $.cookie("rdv_to_edit").toString(),
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      $("#nom_bailleur").val(response[0]["propriete"]["bailleur"]["nom"]);
      $("#prenom_bailleur").val(response[0]["propriete"]["bailleur"]["prenom"]);
      $("#email_bailleur").val(response[0]["propriete"]["bailleur"]["email"]);
      $("#reference_bailleur").val(
        response[0]["propriete"]["bailleur"]["reference"]
      );
      $("#nom_locataire").val(response[0]["propriete"]["locataire"]["nom"]);
      $("#prenom_locataire").val(
        response[0]["propriete"]["locataire"]["prenom"]
      );
      $("#email_locataire").val(response[0]["propriete"]["locataire"]["email"]);
      $("#telephone_locataire").val(
        response[0]["propriete"]["locataire"]["telephone"]
      );
      $("#surface_propriete").val(
        parseInt(response[0]["propriete"]["surface"])
      );
      $("#numero_propriete").val(response[0]["propriete"]["numero"]);
      $("#numero_parking_propriete").val(
        parseInt(response[0]["propriete"]["numeroParking"]
      ));
      $("#adresse_propriete").val(response[0]["propriete"]["adresse"]);
      $("#code_postal_propriete").val(parseInt(response[0]["propriete"]["codePostal"]));
      $("#ville_propriete").val(response[0]["propriete"]["ville"]);
      $("#adresse_complementaire_propriete").val(
        response[0]["propriete"]["adresseComplementaire"]
      );
      $("#numero_cave_propriete").val(response[0]["propriete"]["numeroCave"]);
      $("#numero_sol_propriete").val(response[0]["propriete"]["numeroSol"]);
      $("#ref_lot").val(response[0]["ref_lot"]);
      if(response[0]['dte_sortie_ancien_loc']!=null || response[0]["intervention"]["id"].toString()=="2"){
        if(response[0]['dte_sortie_ancien_loc']!=null){
          var formattedDate1 = new Date(response[0]["dte_sortie_ancien_loc"]).toISOString().split("T")[0];
          $("#date_sortie").val(formattedDate1)
        }
        $('#date_sortie_row').css('display','inline')
      }else{
        $('#date_sortie_row').css('display','none')
      }	    
      var formattedDate = new Date(response[0]["date"])
        .toISOString()
        .split("T")[0];
      $("#date").val(formattedDate);
      $("#ref_edl").val(response[0]["id"]);
      $("#adresse_ancien_locataire").val(
        response[0]["propriete"]["ancien_locataire"]
      );
      getInterventionandPropriete(
        1,
        (val_ = response[0]["intervention"]["id"]),
       val1= response[0]["propriete"]["type_propriete"]["id"]
      );
      $("#type").val(response[0]["propriete"]["type"]);
      $("#consignes_part").val(response[0]["consignes_particuliere"]);
      $("#list_documents").val(response[0]["liste_document_recuperer"]);
      $("#info_diverses").val(response[0]["info_diverses"]);
      if (response[0]["client"] != null) {
        clientFor ={
          "id":response[0]["client"]['id'],
          "_id": response[0]["client"]['id'],
          "email": response[0]["client"]['user']['email'],
          "nom" : response[0]["client"]['user']['prenom']+" "+ response[0]["client"]['user']['nom']+"   "+response[0]["client"]['societe'],
          "telephone": response[0]["client"]['telephone'],
          "adresse":  response[0]["client"]['adresse']
      }
        getClient(response[0]["client"]["user"]["id"], val_ = 1);
      }
      if (response[0]["passeur"] != null) {
        getPasseur(cas = response[0]["passeur"][0]["user"]["id"],add=1,client=response[0]["client"]["user"]["id"],clientF=clientFor,reference_logement=response[0]["ref_lot"].toString());
      } else {
        getPasseur(cas = 0,add=1,client=response[0]["client"]["user"]["id"],clientF=clientFor,reference_logement=response[0]["ref_lot"].toString());
      }
      if (response[0]["agent"] != null) {
        var agent = response[0]["agent"]["user"]["nom"]+" "+response[0]["agent"]["user"]["prenom"]
        getAgent(cas = 1, val_ = response[0]["agent"]["user"]["id"],agent=agent);
      } else {
        getAgent((cas = 1), (val_ = 0),agent=" ");
      }
      getTypeLogement(cas=response[0]["propriete"]["type"]);
      if (response[0]["audit_planneur"] != null) {
        $("#planneur").val(
          response[0]["audit_planneur"]["user"]["nom"] +
            " " +
            response[0]["audit_planneur"]["user"]["prenom"]
        );
      }
      if (response[0]["agent_constat"] != null) {
        $("#constat").val(
          response[0]["agent_constat"]["user"]["nom"] +
            " " +
            response[0]["agent_constat"]["user"]["prenom"]
        );
      }
      if (parseInt(response[0]["statut"]) == 1) {
        $("#steps").progressbar({
          steps: [
            "@En attente de prise en charge",
            "Prise en charge attente horaire",
            "Action requise",
            "Organisé",
          ],
        });
      }
      if (parseInt(response[0]["statut"]) == 2) {
        $("#steps").progressbar({
          steps: [
            "En attente de prise en charge",
            "@Prise en charge attente horaire",
            "Action requise",
            "Organisé",
          ],
        });
      }
      if (parseInt(response[0]["statut"]) == 3) {
        $("#steps").progressbar({
          steps: [
            "En attente de prise en charge",
            "Prise en charge attente horaire",
            "@Action requise",
            "Organisé",
          ],
        });
      }
      if (parseInt(response[0]["statut"]) == 4) {
        $("#steps").progressbar({
          steps: [
            "En attente de prise en charge",
            "Prise en charge attente horaire",
            "Action requise",
            "@Organisé",
          ],
        });
      }
      $("#statut").val(parseInt(response[0]["statut"]).toString()).change();
      if ($.cookie("group") == "Client pro") {
        $("#users_add").empty();
        $("#users_add").append(
          '<label for="exampleInputEmail1">Role</label>\
                <select class="form-control undefined" name="role" id="type_user">\
                  <option value="7">Salarie</option>\
                </select>'
        );
        $("#param_link").empty();
        $("#param_link").css("display", "none");
      }
      if (
        $.cookie("group") == "Client pro" ||
        $.cookie("group") == "Client particulier" ||
        $.cookie("group") == "Salarie"
      ) {
        $("#statut").prop("disabled", true);
        if (parseInt(response[0]["statut"]) != 1) {
          $("#pied").css("display", "none");
        }
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
}
function clearForm() {
  $("#nom_bailleur").val("");
  $("#adresse_ancien_locataire").val("");
  $("#prenom_bailleur").val("");
  $("#email_bailleur").val("");
  $("#reference_bailleur").val("");
  $("#nom_locataire").val("");
  $("#prenom_locataire").val("");
  $("#email_locataire").val("");
  $("#telephone_locataire").val("");
  $("#surface_propriete").val("");
  $("#numero_propriete").val("");
  $("#numero_parking_propriete").val("");
  $("#adresse_propriete").val("");
  $("#code_postal_propriete").val();
  $("#ville_propriete").val("");
  $("#adresse_complementaire_propriete").val("");
  $("#numero_cave_propriete").val("");
  $("#numero_sol_propriete").val("");
  $("#ref_lot").val("");
  $("#ref_edl").val("");
  $("#propriete_val").val("");
  $("#type").val("");
  $("#consignes_part").val("");
  $("#list_documents").val("");
  $("#list_documents").val("");
}

$('#newlogment').click(function(){
  casLogement = 1;
  $('#logement').css("display", "none")
  $('#logement').val("0")
  $('#surface_propriete').val("")
  $("#type").val("0")
  $("#numero_sol_propriete").val("")
  $("#numero_propriete").val("")
  $('#numero_parking_propriete').val("")
  $("#numero_cave_propriete").val("")
  $("#adresse_propriete").val("")
  $("#adresse_complementaire_propriete").val("")
  $("#code_postal_propriete").val("")
  $('#ville_propriete').val("")
  $("#ref_lot").val("")
});
$('#oldlogement').click(function(){
  casLogement = 0;
  $('#logement').css("display", "inline")
});

$("#goSave").on("click", function () {
  
  $("#errorField").text("");
  let error_ = "Le(s) champ(s)"
  let compt =0;
  if($("#intervention_val").val()=="0"){
    console.log('ici1')
    error_=error_+" Type intervention,"
    compt++;
  }
  if($("#propriete_val").val()=="0"){
    console.log('ici')
    error_=error_+" Nature du bien"
    compt++;
  }
  if(compt>0 ){
    error_ = error_ + " sont obligatoires"
    alert(error_);
    $("#errorField").text(error_);
    return;
  }
  $("#editForm").modal('show')
  resultat = addLogement(clientForWork);
  /*if(resultat==1){
    addRdv();
  }else{
    $("#editForm").modal('hide')
    alert("Echec de l'ajout du RDV doublond de réference de logement");
  }*/
 
});

function editRdv() {
  data = {};
  data["nom_bailleur"] = $("#nom_bailleur").val();
  data["prenom_bailleur"] = $("#prenom_bailleur").val();
  data["email_bailleur"] = $("#email_bailleur").val();
  data["reference_bailleur"] = $("#reference_bailleur").val();
  data["nom_locataire"] = $("#nom_locataire").val();
  data["prenom_locataire"] = $("#prenom_locataire").val();
  data["email_locataire"] = $("#email_locataire").val();
  data["telephone_locataire"] = $("#telephone_locataire").val();
  data["surface_propriete"] = $("#surface_propriete").val();
  data["numero_propriete"] = $("#numero_propriete").val();
  data["numero_parking_propriete"] = $("#numero_parking_propriete").val();
  data["adresse_propriete"] = $("#adresse_propriete").val();
  data["code_postal_propriete"] = $("#code_postal_propriete").val();
  data["ville_propriete"] = $("#ville_propriete").val();
  data["adresse_complementaire_propriete"] = $(
    "#adresse_complementaire_propriete"
  ).val();
  data["numero_cave_propriete"] = $("#numero_cave_propriete").val();
  data["numero_sol_propriete"] = $("#numero_sol_propriete").val();
  data["ref_lot"] = $("#ref_lot").val();
  data["ref_edl"] = $("#ref_edl").val();
  data["ancien_locataire"] = $("#adresse_ancien_locataire").val();
  data["intervention"] = $("#intervention_val").val();
  if (
    $.cookie("group") == "Agent secteur" ||
    $.cookie("group") == "Agent constat" ||
    $.cookie("group") == "Audit planneur" ||
    $.cookie("group") == "Administrateur"
  ) {
    data["client"] = $("#client_val").val();
  }
  //data["statut"] =1
  data["date"] = $("#date").val();
  if (
    $.cookie("group") == "Client pro" ||
    $.cookie("group") == "Client particulier" ||
    $.cookie("group") == "Agent secteur" ||
    $.cookie("group") == "Agent constat" ||
    $.cookie("group") == "Audit planneur" ||
    $.cookie("group") == "Administrateur"
  ) {
    if (!$("#passeur_val").val() || $("#passeur_val").val() == "0") {
    } else {
      data["passeur"] = $("#passeur_val").val();
    }
  }
  if (
    $.cookie("group") == "Agent secteur" ||
    $.cookie("group") == "Agent constat" ||
    $.cookie("group") == "Audit planneur"
  ) {
    data["agent"] = $.cookie("id_logged_user_user");
  }
  if ($.cookie("group") == "Administrateur") {
    data["agent"] = $("#agent_val").val();
  }
  if (
    $.cookie("group") == "Client pro" ||
    $.cookie("group") == "Client particulier" ||
    $.cookie("group") == "Salarie"
  ) {
    data["agent"] = $.cookie("id_user_agent");
  }
  data["type_propriete"] = $("#propriete_val").val();
  data["type"] = $("#type").val();
  data["consignes_part"] = $("#consignes_part").val();
  data["list_documents"] = $("#list_documents").val();
  data["info_diverses"] = $("#info_diverses").val();

  if (
    $.cookie("group") == "Client pro" ||
    $.cookie("group") == "Client particulier"
  ) {
    data["client"] = $.cookie("id_logged_user_user");
  }
  if ($.cookie("group") == "Salarie") {
    data["passeur"] = $.cookie("id_logged_user_user");
  }

  var dte = $("#date_sortie").val()
  if(!Date.parse(dte)){
    
  }else{
    data['dte_sortie_ancien_loc'] = $("#date_sortie").val()
  }

  $.ajax({
    type: "PUT",
    url: rdv_add + $.cookie("rdv_to_edit").toString(),
    data: data,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      $("#editForm").modal('hide')
      alert("RDV Modifié avec succes");
      window.location.replace("rendez-vous_list.html");
    },
    error: function (response) {
      $("#editForm").modal('hide')
      alert("Echec Modification");
    },
  });
}
$("#goEdit").on("click", function () {
  let error_ = "Le(s) champ(s)"
  let compt =0;
  if($("#intervention_val").val()=="0"){
    console.log('ici1')
    error_=error_+" Type intervention,"
    compt++;
  }
  if($("#propriete_val").val()=="0"){
    console.log('ici')
    error_=error_+" Nature du bien"
    compt++;
  }
  if(compt>0 ){
    error_ = error_ + " sont obligatoires"
    alert(error_);
    return;
  }
  $("#editForm").modal('show')
  addLogement(clientForWork,cas=1);
});

function onTypeIntervention(){
  val = $('#intervention_val').val()
  if(val=="2"){
    $('#date_sortie_row').css('display','inline')
  }else{
    $('#date_sortie_row').css('display','none')
  }
}

function sotert(object1,object2) {
     if (object1.nom < object2.nom)
        return -1;
     if (object1.nom  >  object2.nom)
        return 1;
        return 0;
}

function getTypeLogement(cas=0){
  $.ajax({
    type: "GET",
    url: 'http://195.15.218.172/edlgateway/api/v1/logement/type_log/all?start=12&limit=12&count=12&category=tre',
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      content = "<option value='0'>SELECTIONNER</option>";
      var r
      if(typeof(response["results"])==="undefined"){
        r = null
      }else{
        r = response['results']
        typeLogement = response['results']
        typeLogement.sort(sotert)
      }
      if(r != null){
        typeLogement.forEach((elt) => {
          if(elt["status"]=="on"){
            content = content +"<option value = " +elt["_id"] +">" +elt["nom"] +"</option>";
          }
          
          });
        $("#ligne_type").empty();
        $("#ligne_type").append(
          "<label for='exampleInputEmail1'>Type </label>\
          <select  class='form-select style='display: none;' form-control form-select-sm' id='type'> " +
            content +
            "</select>"
        );
        if(cas!=0){
          let type_ = typeLogement.find(elem => elem.nom.toString() === cas.toString());
          $("#type").val(type_["_id"]).change();
        }
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function addLogement(compteclient,cas = 0) {
  var data = {};
  $("#goSave").html("Enregistrement en cours...");
  //chargement info basic de l'objet à POST
  data["cas"]="ajout";
  if(casLogement == 0){
    data['cas']="ancien"
  }
  if($.cookie("group") == "Administrateur" || $.cookie("group") == "Agent secteur" || $.cookie("group") == "Agent constat" ||$.cookie("group") == "Audit planneur"){
    data["client"] = {
        "_id": compteclient['id'],
        "email": compteclient['user']==undefined?compteclient['email']:compteclient['user']['email'],
        "nom" : compteclient['user']==undefined?compteclient['prenom']:compteclient['user']['prenom']+" "+compteclient['user']==undefined?compteclient['nom']:compteclient['user']['nom'],
        "telephone": compteclient['telephone'],
        "adresse": compteclient['adresse']
    };
  }
  
  if ($.cookie("group") == "Client pro" || $.cookie("group") == "Client particulier" || $.cookie("group") =="Salarie") {
    data["client"] = clientForWork
  }
  data["numero_de_la_voie"] = "";
  data["extenssion"] = "";
  data["voie"] = "";
  data["nom_de_la_voie"] = "";
  data["information_complementaire"] = $("#adresse_complementaire_propriete").val();
  data["postal_code"] = $("#code_postal_propriete").val();
  data["ville"] = $("#ville_propriete").val();
  data["n_logement"] = $("#numero_propriete").val();
  data["type_log"] = $("#type").val();
  data["mise_en_service_le"] = "";
  data["batiment"] = "";
  data["etage"] = $("#numero_sol_propriete").val();
  data["escalier"] = "";
  data["group"] = "";
  data["secteur"] ="";
  data["surface"] = $("#surface_propriete").val();
  data["code_fact"] = "";
  data["ref_lot_client"] = $("#ref_lot").val();
  data["cave"] = $("#numero_cave_propriete").val();
  data["parking"] = $("#numero_parking_propriete").val();
  data["n_porte"] = "";
  data["adresse"] = $("#adresse_propriete").val();
  data["code_access"] = "";
  data["autres"] = "";
  data["proprietaire"] ="";
  data["type_de_constat"] = "";
  data["iduser"] = $.cookie('id_user_logged');
  let resultat = 1;
  $.ajax({
    type: "POST",
    crossDomain: true,
    dataType: "json",
    url: "http://195.15.218.172/edlgateway/api/v1/logement/logement/add",
    headers: {
      Authorization: "Bearer " + $.cookie("token"),
      "content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify(data),
    success: function (response) {
      resultat = 1;
      if(cas!=0){
        editRdv()
      }else{
        addRdv();
      }
      
      $("#goSave").html("Enregistrer");
    },
    error: function (response) {
      $("#goSave").html("Enregistrer");
      alert("Echec de l'ajout du RDV doublond de réference de logement");
      $("#editForm").modal('hide')
      resultat= 0;
    },
  });
  return resultat;
}

