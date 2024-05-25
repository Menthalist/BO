content = "";
contentClient = "";
url = "http://127.0.0.1:8001/config_app/tarifs/";
urlTariflibre = "http://127.0.0.1:8001/config_app/tariflibre/";
function tarifaction() {
  var content = "";
  var url_go = "http://127.0.0.1:8001/" + "/cmdplannif/all/tarif/";
  data = {
    start: "1",
    count: "50",
    user: $.cookie("id_user_edit"),
  };
  /* alert($.cookie("id_user_edit"));*/
  /*$.ajax({
    type: "GET",
    url: url_go,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
    success: function (response) {
      $("#tableTarif").empty();
      var i = 0;
      response["document"].forEach((elt) => {
        var formattedDate = new Date(elt["created"]);
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
        m += 1; // JavaScript months are 0-11
        var y = formattedDate.getFullYear();
        $("#tableTarif").append(
          "<tr>\
              <td>" +i +"</td>\
              <td>" +elt["name"] +"</td>\
              <td>" +elt["price"] +"</td>\
              <td>" +elt["Type"] +"</td>\
              <td>" +elt["comment"] +"</td>\
              <td>" +String(d).padStart(2, "0") +"/" +String(m).padStart(2, "0") +"/" +y +"</td>\
              <td> <a><i class='bi bi-pencil-square'style='olor: rgb(0, 0, 0)'></i></a>&nbsp;<a ><i class='bi bi-eye' style='color: rgb(136, 102, 119)'></i></a></td>\
          </tr>"
        );
        i++;
      });
    },
    error: function (response) {
      console.log(response);
    },
  });
  */

  $.ajax({
    type: "GET",
    url: base_local+"/client_app/tarifs/",
    headers: {
      Authorization: "Bearer " + token,
    },
    data : {"user":$.cookie("id_user_edit")},
    success: function (response) {
      $("#tableTarif").empty();
      k=1
      for(var i in response){

        $("#tableTarif").append(
          "<tr>\
              <td>" +k +"</td>\
              <td>" +response[i]['taux_meuble']+"</td>\
              <td>" +response[i]['prix_autres'] +"</td>\
              <td>" +response[i]['code_tva'] +"</td>\
              <td>" +response[i]['commentaire_libre'] +"</td>\
              <td> <a onclick=goEdit('"+i+"')><i class='bi bi-pencil-square'style='olor: rgb(0, 0, 0)'></i></a></td>\
          </tr>"
        );
        k++
        console.log(i,"  ",response[i])
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function clearForm(){
  $.cookie("tarif_to_edit", "")
 $('#EDL_prix_std').val("");
  $('#edl_appt_prix_f2').val("")	  
  $("#EDL_appt_prix_f1").val("");
  $("#edl_appt_prix_f3").val("");
  $("#edl_appt_prix_f4").val("");
  $("#edl_appt_prix_f5").val("");
  $("#edl_appt_prix_f6").val("");
  $("#edl_pav_villa_prix_t1").val("");
  $("#edl_pav_villa_prix_t2").val("");
  $("#edl_pav_villa_prix_t3").val("");
  $("#edl_pav_villa_prix_t4").val("");
  $("#edl_pav_villa_prix_t5").val("");
  $("#edl_pav_villa_prix_t6").val("");
  $("#edl_pav_villa_prix_t7").val("");
  $("#edl_pav_villa_prix_t8").val("");
  $("#chiff_appt_prix_stu").val("");
  $("#chif_appt_prix_f1").val("");
  $("#chif_appt_prix_f2").val("");
  $("#chif_appt_prix_f3").val("");
  $("#chif_appt_prix_f4").val("");
  $("#chif_appt_prix_f5").val("");
  $("#chif_pav_villa_prix_t1").val("");
  $("#chif_pav_villa_prix_t2").val("");
  $("#chif_pav_villa_prix_t3").val("");
  $("#chif_pav_villa_prix_t4").val("");
  $("#chif_pav_villa_prix_t5").val("");
  $("#chif_pav_villa_prix_t6").val("");
  $("#chif_pav_villa_prix_t7").val("");
  $("#chif_pav_villa_prix_t8").val("");
  $("#code_tva").val("");
  $("#referent_as_client").val("");
  $("#com_as_sur_ca_client").val("");
  $("#com_cell_dev_ref_agent").val("")
  $("#com_cell_tech_ref_agent").val("");
  $("#com_cell_dev_ref_responsable").val("");
  $("#prix_autres").val("");
  $("#taux_meuble").val("");
  $("#com_cell_tech_ref_responsable").val("");
  $("#com_cell_tech_ref_suiveur").val("");
  $("#com_cell_planif_ref_responsable").val("");
  $("#com_cell_planif_ref_suiveur").val("");
  $("#com_cell_planif_ref_gent_saisie").val("");
  $("#cell_dev_ref_responsable").val("");
  $("#cell_dev_ref_agent").val("");
  $("#cell_tech_ref_responsable").val("");
  $("#cell_tech_ref_suiveur").val("");
  $("#cell_planif_ref_responsable").val("");
  $("#cell_planif_ref_suiveur").val("")
  $("#cell_planif_ref_gent_saisie").val("")
  $("#commentaire_libre").val("")
  $("#chif_edl_pav_villa_prix_t2").val("")
  $("#chif_edl_pav_villa_prix_t3").val("")
  $("#chif_edl_pav_villa_prix_t4").val("")
  $("#chif_edl_pav_villa_prix_t5").val("")
  $("#chif_edl_pav_villa_prix_t6").val("")
  $("#chif_edl_pav_villa_prix_t7").val("")
  $("#chif_edl_pav_villa_prix_t8").val("")
  $("#com_as_sur_client").val("")
  $("#cell_tech_ref_agent").val("")
  $("#com_as_sur_ca_client").val("")
  $("#chif_appt_prix_f6").val("")
  $("#chif_appt_prix_f8").val("")
  $("#chif_appt_prix_f7").val("")
}

function addTarif(){
  if($('#nature_du_bien').val()=="0" || $('#client_id').val()=="0" ){
    alert('client et nature du bien obligatoire');
    return;
  }
  var data ={}
  var ref_client =  $('#client_id option:selected').text();
  var nature_logementText =  $('#nature_du_bien option:selected').text();
  data['user_id'] = $.cookie('id_user_logged');
  data["meuble"] = $('#nature_du_bien').val();	
  data["nature_bien"] = $('#nature_du_bien').val();	
  data["edl_prix_std"] = parseFloat($('#EDL_prix_std').val());
  data['edl_appt_prix_f2'] = parseFloat($('#edl_appt_prix_f2').val());	  
  data["edl_appt_prix_f1"] = parseFloat($("#EDL_appt_prix_f1").val());
  data["edl_appt_prix_f3"] = parseFloat($("#edl_appt_prix_f3").val());
  data["edl_appt_prix_f4"] = parseFloat($("#edl_appt_prix_f4").val());
  data["edl_appt_prix_f5"] = parseFloat($("#edl_appt_prix_f5").val());
  data["edl_appt_prix_f6"] = parseFloat($("#edl_appt_prix_f6").val());
  data["edl_pav_villa_prix_t1"] = parseFloat($("#edl_pav_villa_prix_t1").val());
  data["edl_pav_villa_prix_t2"] = parseFloat($("#edl_pav_villa_prix_t2").val());
  data["edl_pav_villa_prix_t3"] = parseFloat($("#edl_pav_villa_prix_t3").val());
  data["edl_pav_villa_prix_t4"] = parseFloat($("#edl_pav_villa_prix_t4").val());
  data["edl_pav_villa_prix_t5"] = parseFloat($("#edl_pav_villa_prix_t5").val());
  data["edl_pav_villa_prix_t6"] = parseFloat($("#edl_pav_villa_prix_t6").val());
  data["edl_pav_villa_prix_t7"] = parseFloat($("#edl_pav_villa_prix_t7").val());
  data["edl_pav_villa_prix_t8"] = parseFloat($("#edl_pav_villa_prix_t8").val());
  data["chif_appt_prix_stu"] = parseFloat($("#chiff_appt_prix_stu").val());
  data["chif_appt_prix_f1"] = parseFloat($("#chif_appt_prix_f1").val());
  data["chif_appt_prix_f2"] = parseFloat($("#chif_appt_prix_f2").val());
  data["chif_appt_prix_f3"] = parseFloat($("#chif_appt_prix_f3").val());
  data["chif_appt_prix_f4"] = parseFloat($("#chif_appt_prix_f4").val());
  data["chif_appt_prix_f5"] = parseFloat($("#chif_appt_prix_f5").val());
  data["chif_appt_prix_f6"] = parseFloat($("#chif_appt_prix_f6").val());
  data["chif_appt_prix_f7"] = parseFloat($("#chif_appt_prix_f7").val());
  data["chif_appt_prix_f8"] = parseFloat($("#chif_appt_prix_f8").val());
  data["chif_pav_villa_prix_t1"] = 0;
  data["chif_pav_villa_prix_t2"] = 0;
  data["chif_pav_villa_prix_t3"] = 0;
  data["chif_pav_villa_prix_t4"] = 0;
  data["chif_pav_villa_prix_t5"] = 0;
  data["chif_pav_villa_prix_t6"] = 0;
  data["chif_pav_villa_prix_t7"] = 0;
  data["chif_pav_villa_prix_t8"] = 0;
  data["code_tva"] = $("#code_tva").val();
  data["com_cell_tech_ref_agent"] = parseFloat($("#com_cell_tech_ref_agent").val());
  data["referent_as_client"] = $("#referent_as_client").val();
  data["com_as_sur_ca_client"] = parseFloat($("#com_as_sur_ca_client").val());
  data["com_cell_dev_ref_agent"] = parseFloat($("#com_cell_dev_ref_agent").val());
  data["com_cell_dev_ref_responsable"] = parseFloat($("#com_cell_dev_ref_responsable").val());
  data["com_cell_tech_ref_responsable"] = parseFloat($("#com_cell_tech_ref_responsable").val());
  data["com_cell_planif_ref_responsable"] = parseFloat($("#com_cell_planif_ref_responsable").val());
  data["com_cell_tech_ref_suiveur"] = parseFloat($("#com_cell_tech_ref_suiveur").val());
  data["com_cell_planif_ref_suiveur"] = parseFloat($("#com_cell_planif_ref_suiveur").val());
  data["com_cell_planif_ref_gent_saisie"] = parseFloat($("#com_cell_planif_ref_gent_saisie").val());
  data["cell_dev_ref_responsable"] = parseFloat($("#cell_dev_ref_responsable").val());
  data["cell_dev_ref_agent"] = parseFloat($("#cell_dev_ref_agent").val());
  data["cell_tech_ref_suiveur"] = parseFloat($("#cell_tech_ref_suiveur").val());
  data["cell_tech_ref_responsable"] = parseFloat($("#cell_tech_ref_responsable").val());
  data["cell_planif_ref_responsable"] = parseFloat($("#cell_planif_ref_responsable").val());
  data["cell_planif_ref_suiveur"] = parseFloat($("#cell_planif_ref_suiveur").val());
  data["cell_planif_ref_gent_saisie"] = parseFloat($("#cell_planif_ref_gent_saisie").val());
  data["commentaire_libre"] = $("#commentaire_libre").val();
  data["chif_edl_pav_villa_prix_t2"] = parseFloat($("#chif_edl_pav_villa_prix_t2").val());
  data["chif_edl_pav_villa_prix_t3"] = parseFloat($("#chif_edl_pav_villa_prix_t3").val());
  data["chif_edl_pav_villa_prix_t4"] = parseFloat($("#chif_edl_pav_villa_prix_t4").val());
  data["chif_edl_pav_villa_prix_t5"] = parseFloat($("#chif_edl_pav_villa_prix_t5").val());
  data["chif_edl_pav_villa_prix_t6"] = $("#chif_edl_pav_villa_prix_t6").val();
  data["chif_edl_pav_villa_prix_t7"] = $("#chif_edl_pav_villa_prix_t7").val();
  data["chif_edl_pav_villa_prix_t8"] = $("#chif_edl_pav_villa_prix_t8").val();
  data["chif_appt_prix_f7"] = parseFloat($("#chif_appt_prix_f7").val());
  data["chif_appt_prix_f8"] = parseFloat($("#chif_appt_prix_f8").val());
  data["com_as_sur_ca_client"] = parseFloat($("#com_as_sur_ca_client").val());
  data["cell_tech_ref_agent"] = parseFloat($("#cell_tech_ref_agent").val());
  data["com_as_sur_client"] = parseFloat($("#com_as_sur_client").val());
  data["prix_autres"] = parseFloat($("#prix_autres").val());
  data["taux_meuble"] = parseFloat($("#taux_meuble").val());
  data["client_id"] = $("#client_id").val();
  data['ref_client'] = ref_client;
  data['nature_bien_text'] = nature_logementText;

  var jsonData = JSON.stringify(data);

  $.ajax({
    type: "POST",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: 'application/json',
    data: jsonData,
    success: function (response) {
      $("#editForm").modal('hide')
      alert("Ajout de tarif réussie");
      clearForm();
      window.location.replace("tarif.html");
    },
    error: function (response) {
      console.log(response)
      alert("Echec d'ajout de tarif");
    },
  });
}

function goEdit(id){
  if($.cookie("group") == "Agent secteur" || $.cookie("group") == "Administrateur") {
    $.cookie("tarif_to_edit", id);
    window.location.replace("editer_un_tarif.html");
  }
  else{
    alert('Privilèges inssufisants')
    return
  }
  
}

function getTarifToEdit(){
  if($.cookie("group") == "Agent secteur" || $.cookie("group") == "Administrateur" || $.cookie("group") == "Agent constat") {

  }
  else{
    alert('Privilèges inssufisants')
    window.location.replace("dashboard.html");
  }
  url = url+$.cookie("tarif_to_edit")
  $.ajax({
    type: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      console.log(response)
      response = response[0];
      $('#EDL_prix_std').val(response['edl_prix_std']);      
      $('#edl_appt_prix_f2').val(response['edl_appt_prix_f2']).change();  
      $("#EDL_appt_prix_f1").val(response['edl_appt_prix_f1']);
      $("#edl_appt_prix_f3").val(response['edl_appt_prix_f3']);
      $("#edl_appt_prix_f4").val(response['edl_appt_prix_f4']);
      $("#edl_appt_prix_f5").val(response['edl_appt_prix_f5']);
      $("#edl_appt_prix_f6").val(response['edl_appt_prix_f6']);
      $("#edl_pav_villa_prix_t1").val(response['edl_pav_villa_prix_t1']);
      $("#edl_pav_villa_prix_t2").val(response['edl_pav_villa_prix_t2']);
      $("#edl_pav_villa_prix_t3").val(response['edl_pav_villa_prix_t3']);
      $("#edl_pav_villa_prix_t4").val(response['edl_pav_villa_prix_t4']);
      $("#edl_pav_villa_prix_t5").val(response['edl_pav_villa_prix_t5']);
      $("#edl_pav_villa_prix_t6").val(response['edl_pav_villa_prix_t6']);
      $("#edl_pav_villa_prix_t7").val(response['edl_pav_villa_prix_t7']);
      $("#edl_pav_villa_prix_t8").val(response['edl_pav_villa_prix_t8']);
      $("#chiff_appt_prix_stu").val(response['chif_appt_prix_stu']);
      $("#chif_appt_prix_f1").val(response['chif_appt_prix_f1']);
      $("#chif_appt_prix_f2").val(response['chif_appt_prix_f2']);
      $("#chif_appt_prix_f3").val(response['chif_appt_prix_f3']);
      $("#chif_appt_prix_f4").val(response['chif_appt_prix_f4']);
      $("#chif_appt_prix_f5").val(response['chif_appt_prix_f5']);
      $("#chif_pav_villa_prix_t1").val(response['chif_pav_villa_prix_t1']);
      $("#chif_pav_villa_prix_t2").val(response['chif_pav_villa_prix_t2']);
      $("#chif_pav_villa_prix_t3").val(response['chif_pav_villa_prix_t3']);
      $("#chif_pav_villa_prix_t4").val(response['chif_pav_villa_prix_t4']);
      $("#chif_pav_villa_prix_t5").val(response['chif_pav_villa_prix_t5']);
      $("#chif_pav_villa_prix_t6").val(response['chif_pav_villa_prix_t6']);
      $("#chif_pav_villa_prix_t7").val(response['chif_pav_villa_prix_t7']);
      $("#chif_pav_villa_prix_t8").val(response['chif_pav_villa_prix_t8']);
      $("#code_tva").val(response['code_tva']);
      $("#referent_as_client").val(response['referent_as_client']);
      $("#com_cell_tech_ref_agent").val(response['com_cell_tech_ref_agent']);
      $("#com_as_sur_ca_client").val(response['com_as_sur_ca_client']);
      $("#com_cell_dev_ref_agent").val(response['com_cell_dev_ref_agent'])
      $("#com_cell_dev_ref_responsable").val(response['com_cell_dev_ref_responsable']);
      $("#com_cell_tech_ref_responsable").val(response['com_cell_tech_ref_responsable']);
      $("#com_cell_tech_ref_suiveur").val(response['com_cell_tech_ref_suiveur']);
      $("#com_cell_planif_ref_responsable").val(response['com_cell_planif_ref_responsable']);
      $("#com_cell_planif_ref_suiveur").val(response['com_cell_planif_ref_suiveur']);
      $("#com_cell_planif_ref_gent_saisie").val(response['com_cell_planif_ref_gent_saisie']);
      $("#cell_dev_ref_responsable").val(response['cell_dev_ref_responsable']);
      $("#cell_dev_ref_agent").val(response['cell_dev_ref_agent']);
      $("#cell_tech_ref_suiveur").val(response['cell_tech_ref_suiveur']);
      $("#cell_tech_ref_responsable").val(response['cell_tech_ref_responsable']);
      $("#cell_planif_ref_responsable").val(response['cell_planif_ref_responsable']);
      $("#cell_planif_ref_suiveur").val(response['cell_planif_ref_suiveur']);
      $("#cell_planif_ref_gent_saisie").val(response['cell_planif_ref_gent_saisie']);
      $("#commentaire_libre").val(response['commentaire_libre']);
      $("#chif_edl_pav_villa_prix_t2").val(response['chif_edl_pav_villa_prix_t2']);
      $("#chif_edl_pav_villa_prix_t3").val(response['chif_edl_pav_villa_prix_t3']);
      $("#chif_edl_pav_villa_prix_t4").val(response['chif_edl_pav_villa_prix_t4']);
      $("#chif_edl_pav_villa_prix_t5").val(response['chif_edl_pav_villa_prix_t5']);
      $("#chif_edl_pav_villa_prix_t6").val(response['chif_edl_pav_villa_prix_t6']);
      $("#chif_edl_pav_villa_prix_t7").val(response['chif_edl_pav_villa_prix_t7']);
      $("#chif_edl_pav_villa_prix_t8").val(response['chif_edl_pav_villa_prix_t8']);
      $("#chif_appt_prix_f6").val(response['chif_appt_prix_f6']);
      $("#com_as_sur_ca_client").val(response['com_as_sur_ca_client']);
      $("#cell_tech_ref_agent").val(response['cell_tech_ref_agent']);
      $("#com_as_sur_client").val(response['com_as_sur_client']);
      $("#prix_autres").val(response['prix_autres']);
      $("#taux_meuble").val(response['taux_meuble']);
      $("#chif_appt_prix_f8").val(response['chif_appt_prix_f8']);
      $("#chif_appt_prix_f7").val(response['chif_appt_prix_f7']);
      getClient(val1=1,idClient=response['client_id'],nomClient=response['ref_client'])
      getPropriete(response['meuble'])

  },
    error: function (response) {
      alert('Echec de récupération des tarifs')
    },
  });

}

$('#addTarifsBtn').on("click",function(){
  if ($.cookie("group") == "Agent secteur" || $.cookie("group") == "Administrateur") {
    window.location.replace("ajouter-un-tarif.html");
  }
  else{
    alert('Privilèges inssufisants')
    return
  }
})

function editTarifs(){
 
  var data ={}
  var ref_client =  $('#client_id option:selected').text();
  var nature_logementText =  $('#nature_du_bien option:selected').text();
  data['user_id'] = $.cookie('id_user_logged');
  data["meuble"] = $('#nature_du_bien').val();	
  data["nature_bien"] = $('#nature_du_bien').val();	
  data["edl_prix_std"] = parseFloat($('#EDL_prix_std').val());
  data['edl_appt_prix_f2'] = parseFloat($('#edl_appt_prix_f2').val());	  
  data["edl_appt_prix_f1"] = parseFloat($("#EDL_appt_prix_f1").val());
  data["edl_appt_prix_f3"] = parseFloat($("#edl_appt_prix_f3").val());
  data["edl_appt_prix_f4"] = parseFloat($("#edl_appt_prix_f4").val());
  data["edl_appt_prix_f5"] = parseFloat($("#edl_appt_prix_f5").val());
  data["edl_appt_prix_f6"] = parseFloat($("#edl_appt_prix_f6").val());
  data["edl_pav_villa_prix_t1"] = parseFloat($("#edl_pav_villa_prix_t1").val());
  data["edl_pav_villa_prix_t2"] = parseFloat($("#edl_pav_villa_prix_t2").val());
  data["edl_pav_villa_prix_t3"] = parseFloat($("#edl_pav_villa_prix_t3").val());
  data["edl_pav_villa_prix_t4"] = parseFloat($("#edl_pav_villa_prix_t4").val());
  data["edl_pav_villa_prix_t5"] = parseFloat($("#edl_pav_villa_prix_t5").val());
  data["edl_pav_villa_prix_t6"] = parseFloat($("#edl_pav_villa_prix_t6").val());
  data["edl_pav_villa_prix_t7"] = parseFloat($("#edl_pav_villa_prix_t7").val());
  data["edl_pav_villa_prix_t8"] = parseFloat($("#edl_pav_villa_prix_t8").val());
  data["chif_appt_prix_stu"] = parseFloat($("#chiff_appt_prix_stu").val());
  data["chif_appt_prix_f1"] = parseFloat($("#chif_appt_prix_f1").val());
  data["chif_appt_prix_f2"] = parseFloat($("#chif_appt_prix_f2").val());
  data["chif_appt_prix_f3"] = parseFloat($("#chif_appt_prix_f3").val());
  data["chif_appt_prix_f4"] = parseFloat($("#chif_appt_prix_f4").val());
  data["chif_appt_prix_f5"] = parseFloat($("#chif_appt_prix_f5").val());
  data["chif_appt_prix_f6"] = parseFloat($("#chif_appt_prix_f6").val());
  data["chif_appt_prix_f7"] = parseFloat($("#chif_appt_prix_f7").val());
  data["chif_appt_prix_f8"] = parseFloat($("#chif_appt_prix_f8").val());
  data["chif_pav_villa_prix_t1"] = 0;
  data["chif_pav_villa_prix_t2"] = 0;
  data["chif_pav_villa_prix_t3"] = 0;
  data["chif_pav_villa_prix_t4"] = 0;
  data["chif_pav_villa_prix_t5"] = 0;
  data["chif_pav_villa_prix_t6"] = 0;
  data["chif_pav_villa_prix_t7"] = 0;
  data["chif_pav_villa_prix_t8"] = 0;
  data["code_tva"] = $("#code_tva").val();
  data["com_cell_tech_ref_agent"] = parseFloat($("#com_cell_tech_ref_agent").val());
  data["referent_as_client"] = $("#referent_as_client").val();
  data["com_as_sur_ca_client"] = parseFloat($("#com_as_sur_ca_client").val());
  data["com_cell_dev_ref_agent"] = parseFloat($("#com_cell_dev_ref_agent").val());
  data["com_cell_dev_ref_responsable"] = parseFloat($("#com_cell_dev_ref_responsable").val());
  data["com_cell_tech_ref_responsable"] = parseFloat($("#com_cell_tech_ref_responsable").val());
  data["com_cell_planif_ref_responsable"] = parseFloat($("#com_cell_planif_ref_responsable").val());
  data["com_cell_tech_ref_suiveur"] = parseFloat($("#com_cell_tech_ref_suiveur").val());
  data["com_cell_planif_ref_suiveur"] = parseFloat($("#com_cell_planif_ref_suiveur").val());
  data["com_cell_planif_ref_gent_saisie"] = parseFloat($("#com_cell_planif_ref_gent_saisie").val());
  data["cell_dev_ref_responsable"] = parseFloat($("#cell_dev_ref_responsable").val());
  data["cell_dev_ref_agent"] = parseFloat($("#cell_dev_ref_agent").val());
  data["cell_tech_ref_suiveur"] = parseFloat($("#cell_tech_ref_suiveur").val());
  data["cell_tech_ref_responsable"] = parseFloat($("#cell_tech_ref_responsable").val());
  data["cell_planif_ref_responsable"] = parseFloat($("#cell_planif_ref_responsable").val());
  data["cell_planif_ref_suiveur"] = parseFloat($("#cell_planif_ref_suiveur").val());
  data["cell_planif_ref_gent_saisie"] = parseFloat($("#cell_planif_ref_gent_saisie").val());
  data["commentaire_libre"] = $("#commentaire_libre").val();
  data["chif_edl_pav_villa_prix_t2"] = parseFloat($("#chif_edl_pav_villa_prix_t2").val());
  data["chif_edl_pav_villa_prix_t3"] = parseFloat($("#chif_edl_pav_villa_prix_t3").val());
  data["chif_edl_pav_villa_prix_t4"] = parseFloat($("#chif_edl_pav_villa_prix_t4").val());
  data["chif_edl_pav_villa_prix_t5"] = parseFloat($("#chif_edl_pav_villa_prix_t5").val());
  data["chif_edl_pav_villa_prix_t6"] = $("#chif_edl_pav_villa_prix_t6").val();
  data["chif_edl_pav_villa_prix_t7"] = $("#chif_edl_pav_villa_prix_t7").val();
  data["chif_edl_pav_villa_prix_t8"] = $("#chif_edl_pav_villa_prix_t8").val();
  data["chif_appt_prix_f7"] = parseFloat($("#chif_appt_prix_f7").val());
  data["chif_appt_prix_f8"] = parseFloat($("#chif_appt_prix_f8").val());
  data["com_as_sur_ca_client"] = parseFloat($("#com_as_sur_ca_client").val());
  data["cell_tech_ref_agent"] = parseFloat($("#cell_tech_ref_agent").val());
  data["com_as_sur_client"] = parseFloat($("#com_as_sur_client").val());
  data["prix_autres"] = parseFloat($("#prix_autres").val());
  data["taux_meuble"] = parseFloat($("#taux_meuble").val());
  data["client_id"] = $("#client_id").val();
  data['ref_client'] = ref_client;
  data['nature_bien_text'] = nature_logementText;

  url =url
  $.ajax({
    type: "PUT",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
    success: function (response) {
      $("#editForm").modal('hide')
      alert("Modification du tarif réussie");
      clearForm();
      window.location.replace("tarif.html");
    },
    error: function (response) {
      alert("Echec de modification de tarif");
    },
  });

}

$('#goAddTarifs').on('click',function(){
  addTarif()
})

$('#goEditTarifs').on('click',function(){
  editTarifs()
})

/* module tarifs libre*/
//ajout d'un tarif libre
function ajoutTatrifLibre(){
  if($('#client_id').val()=="0" ){
    alert('client obligatoire');
    return;
  }
  data = {};

  var ref_client =  $('#client_id option:selected').text();
  //var nature_logementText =  $('#nature_du_bien option:selected').text();
  data['user_id'] = $.cookie('id_user_logged');
  data['ref_client'] = ref_client;
  data["client_id"] = $('#client_id').val();	
  data["intitulePrestation"] = $('#intitulePrestation').val();	
  data["typeDePrestation"] = $('#typePrestation').val();	
  data["description"] = ($('#description').val());
  data['referenceCommande'] = ($('#referenceCommande').val());	  
  data["quantite"] = $("#quantite").val();
  data["prixUnitaire"] = $("#prixUnitaire").val();
  data["montantTotalHT"] = $("#montantTotalT").val();
  data["remise"] = $("#remise").val();
  data["montantTotalHTRemise"] = $("#montantTotalHTRemise").val();
  data["delaiPaiement"] = $("#delaiPeiement").val();
  data["typePaiement"] = $("#typePaiement").val();
  data["lienPaiement"] = $("#lienPaiement").val();

  var jsonData = JSON.stringify(data);

  $.ajax({
    type: "POST",
    url: urlTariflibre,
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: 'application/json',
    data: jsonData,
    success: function (response) {
      $("#editForm").modal('hide')
      alert("Ajout de tarif libre réussie");
      clearForm();
      window.location.replace("ajouter-un-tarif-libre.html");
    },
    error: function (response) {
      console.log(response)
      alert("Echec d'ajout de tarif libre");
    },
  });
 
}

$('#goAddTarifLibre').on('click',function(){
  ajoutTatrifLibre();
})

//récupération de tous les tarifs 
function getAllTarifLibre(){
  $.ajax({
    type: "GET",
    url: urlTariflibre,
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
        // Ajout d'une ligne au tableau HTML pour chaque tarif
        $("#contentTableTarif").append(

          '<tr>\
            <td>' +i + "</td>\
            <td>" +elt["ref_client"]+"</td>\
            <td>" +elt["typeDePrestation"] +"</td>\
            <td>" +elt["intitulePrestation"]+"</td>\
            <td>" +elt["prixUnitaire"] +"</td>\
            <td><a onclick=\"goWhereEditTarifLibre('"+elt["id"] +"')\"><i class=\"bi bi-pencil-square\"style=\"color: rgb(0, 0, 0)\"></i></a>&nbsp;<a onclick=\"goWhereEditTarifLibre('" +elt["id"] +"'\")><i class=\"fa fa-calendar\" aria-hidden=\"true\" style=\"color: rgb(136, 102, 119)\"></i></a></td>\
          </tr>"
        );
        i++;
      });
      $("#waiters").css("display", "none");
    },
    error: function (response) {
      console.log(response);
    }
  });
}

//redirection vers edition d'un tarif libre pour édition
function goWhereEditTarifLibre(id){
  if($.cookie("group") == "Agent secteur" || $.cookie("group") == "Administrateur") {
    $.cookie("tarif_libre_to_edit", id);
    window.location.replace("modifierTarifLibre.html");
  }
  else{
    alert('Privilèges inssufisants')
    return
  }
}

//récupération d'un tarif libre pour edition
function getTarifLibreToEdit(){
  if($.cookie("group") == "Agent secteur" || $.cookie("group") == "Administrateur" ) {

  }
  else{
    alert('Privilèges inssufisants')
    window.location.replace("dashboard.html");
  }
  url = urlTariflibre+$.cookie("tarif_libre_to_edit")
  $.ajax({
    type: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      response = response[0];
      $('#intitulePrestation').val(response['intitulePrestation']);      
      $('#typePrestation').val(response['typeDePrestation']).change();  
      $("#description").val(response['description']);
      $("#referenceCommande").val(response['referenceCommande']);
      $("#quantite").val(response['quantite']);
      $("#prixUnitaire").val(response['prixUnitaire']);
      $("#montantTotalT").val(response['montantTotalHT']);
      $("#montantTotalHTRemise").val(response['montantTotalHTRemise']);
      $("#remise").val(response['remise']);
      $("#delaiPeiement").val(response['delaiPaiement']);
      $("#typePaiement").val(response['typeDePaiment']);
      $("#lienPaiement").val(response['lienPaiment']);
      console.log(response['clientId'])
      getClient(val1=1,idClient=response['clientId'],nomClient=response['ref_client'])
  },
    error: function (response) {
      alert('Echec de récupération des tarif libre')
    },
  });
}

//function pour éditer tarif libre
function editTarifLibre(){

  data = {};
  var ref_client =  $('#client_id option:selected').text();
  data['user_id'] = $.cookie('id_user_logged');
  data['ref_client'] = ref_client;
  data["client_id"] = $('#client_id').val();	
  data["intitulePrestation"] = $('#intitulePrestation').val();	
  data["typeDePrestation"] = $('#typePrestation').val();	
  data["description"] = ($('#description').val());
  data['referenceCommande'] = ($('#referenceCommande').val());	  
  data["quantite"] = $("#quantite").val();
  data["prixUnitaire"] = $("#prixUnitaire").val();
  data["montantTotalHT"] = $("#montantTotalT").val();
  data["remise"] = $("#remise").val();
  data["montantTotalHTRemise"] = $("#montantTotalHTRemise").val();
  data["delaiPaiement"] = $("#delaiPeiement").val();
  data["typePaiement"] = $("#typePaiement").val();
  data["lienPaiement"] = $("#lienPaiement").val();

  var jsonData = JSON.stringify(data);

  $.ajax({
    type: "PUT",
    url: urlTariflibre+$.cookie("tarif_libre_to_edit"),
    headers: {
      Authorization: "Bearer " + token,
    },
    contentType: 'application/json',
    data: jsonData,
    success: function (response) {
      $("#editForm").modal('hide')
      alert("Modification de tarif libre réussie");
      clearForm();
      window.location.replace("ajouter-un-tarif-libre.html");
    },
    error: function (response) {
      console.log(response)
      alert("Echec d'ajout de tarif libre");
    },
  });
}

//edition du tarif libre
$("#goEditTarifLibre").on("click",function(){
  editTarifLibre();
});

function triTarifLibre(){
  
}

function getPropriete(val1 = 0) {
  $.ajax({
    type: "GET",
    url: "http://195.15.218.172/config_app/propriete/?paginated=t",//propriete,
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
                    <select  class='form-select form-control form-select-md' id='nature_du_bien'> " +
          content +
          "</select>"
      );
      if (val1 != 0) {
        $("#nature_du_bien").val(val1).change();
      }
    },
    error: function (response) {
      console.log(response);
    },
  });
}

function getClient(val1=0,idClient="",nomClient=""){
  if (val1 != 0) {
    alert(idClient)
    $("#client").empty();
    $("#client").append(
      " <label for='exampleInputEmail1'>Client</label>\
                  <select  class='form-select form-control form-select-md' id='client_id'>\
                  <option value = " +idClient+">" +nomClient +"</option></select>"
    );
    return;
  }
  contentClient="";
  $.ajax({
    type: "GET",
    url: 'http://195.15.218.172/manager_app/user/tri/?agent=138&role=Client%20particulier',
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      contentClient = "<option value='0'>SELECTIONNER</option>";
      response["results"].forEach((elt) => {
          contentClient =
            contentClient +
            "<option value = " +
            elt["id"] +
            ">" +
            elt["first_name"] +" "+elt["last_name"]+
            "</option>";
      });
      getClientpro(contentClient)
    },
    error: function (response) {
      console.log(response);
    },
  });

  
}

function getClientpro(content){
  $.ajax({
    type: "GET",
    url: 'http://195.15.218.172/manager_app/user/tri/?agent=138&role=Client%20pro',
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      response["results"].forEach((elt) => {
          content =
            content +
            "<option value = " +elt["id"] +">" +elt["client"]["societe"] +"</option>";
      });
      $("#client").empty();
      $("#client").append(
        "\
                    <select  class='form-select form-control form-select-md' id='client_id'> " +
          content + "</select>"
      );
      
    },
    error: function (response) {
      console.log(response);
    },
  });
}



