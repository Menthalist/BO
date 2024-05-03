function tarifaction() {
  var content = "";
  var url_go = "http://195.15.218.172/" + "/cmdplannif/all/tarif/";
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
  var data ={}
  data['user_id'] = $.cookie("id_user_edit")
   data["meuble"] = $('#nature_du_bien').val();	
  data["edl_prix_std"] = $('#EDL_prix_std').val();
  data['edl_appt_prix_f2'] = $('#edl_appt_prix_f2').val()	  
  data["edl_appt_prix_f1"] = $("#EDL_appt_prix_f1").val();
  data["edl_appt_prix_f3"] = ($("#edl_appt_prix_f3").val());
  data["edl_appt_prix_f4"] = $("#edl_appt_prix_f4").val();
  data["edl_appt_prix_f5"] = $("#edl_appt_prix_f5").val();
  data["edl_appt_prix_f6"] = $("#edl_appt_prix_f6").val();
  data["edl_pav_villa_prix_t1"] = $("#edl_pav_villa_prix_t1").val();
  data["edl_pav_villa_prix_t2"] = $("#edl_pav_villa_prix_t2").val();
  data["edl_pav_villa_prix_t3"] = $("#edl_pav_villa_prix_t3").val();
  data["edl_pav_villa_prix_t4"] = $("#edl_pav_villa_prix_t4").val();
  data["edl_pav_villa_prix_t5"] = $("#edl_pav_villa_prix_t5").val();
  data["edl_pav_villa_prix_t6"] = $("#edl_pav_villa_prix_t6").val();
  data["edl_pav_villa_prix_t7"] = $("#edl_pav_villa_prix_t7").val();
  data["edl_pav_villa_prix_t8"] = $("#edl_pav_villa_prix_t8").val();
  data["chif_appt_prix_stu"] = $("#chiff_appt_prix_stu").val();
  data["chif_appt_prix_f1"] = $("#chif_appt_prix_f1").val();
  data["chif_appt_prix_f2"] = $("#chif_appt_prix_f2").val();
  data["chif_appt_prix_f3"] = $("#chif_appt_prix_f3").val();
  data["chif_appt_prix_f4"] = $("#chif_appt_prix_f4").val();
  data["chif_appt_prix_f5"] = $("#chif_appt_prix_f5").val();
  data["chif_appt_prix_f6"] = $("#chif_appt_prix_f6").val();
  data["chif_appt_prix_f7"] = $("#chif_appt_prix_f7").val();
  data["chif_appt_prix_f8"] = $("#chif_appt_prix_f8").val();
  data["chif_pav_villa_prix_t1"] = $("#chif_pav_villa_prix_t1").val();
  data["chif_pav_villa_prix_t2"] = $("#chif_pav_villa_prix_t2").val();
  data["chif_pav_villa_prix_t3"] = $("#chif_pav_villa_prix_t3").val();
  data["chif_pav_villa_prix_t4"] = $("#chif_pav_villa_prix_t4").val();
  data["chif_pav_villa_prix_t5"] = $("#chif_pav_villa_prix_t5").val();
  data["chif_pav_villa_prix_t6"] = $("#chif_pav_villa_prix_t6").val();
  data["chif_pav_villa_prix_t7"] = $("#chif_pav_villa_prix_t7").val();
  data["chif_pav_villa_prix_t8"] = $("#chif_pav_villa_prix_t8").val();
  data["code_tva"] = $("#code_tva").val();
  data["com_cell_tech_ref_agent"] = $("#com_cell_tech_ref_agent").val();
  data["referent_as_client"] = $("#referent_as_client").val();
  data["com_as_sur_ca_client"] = $("#com_as_sur_ca_client").val();
  data["com_cell_dev_ref_agent"] = $("#com_cell_dev_ref_agent").val();
  data["com_cell_dev_ref_responsable"] = $("#com_cell_dev_ref_responsable").val();
  data["com_cell_tech_ref_responsable"] = $("#com_cell_tech_ref_responsable").val();
  data["com_cell_planif_ref_responsable"] = $("#com_cell_planif_ref_responsable").val();
  data["com_cell_tech_ref_suiveur"] = $("#com_cell_tech_ref_suiveur").val();
  data["com_cell_planif_ref_suiveur"] = $("#com_cell_planif_ref_suiveur").val();
  data["com_cell_planif_ref_gent_saisie"] = $("#com_cell_planif_ref_gent_saisie").val();
  data["cell_dev_ref_responsable"] = $("#cell_dev_ref_responsable").val();
  data["cell_dev_ref_agent"] = $("#cell_dev_ref_agent").val();
  data["cell_tech_ref_suiveur"] = $("#cell_tech_ref_suiveur").val();
  data["cell_tech_ref_responsable"] = $("#cell_tech_ref_responsable").val();
  data["cell_planif_ref_responsable"] = $("#cell_planif_ref_responsable").val();
  data["cell_planif_ref_suiveur"] = $("#cell_planif_ref_suiveur").val();
  data["cell_planif_ref_gent_saisie"] = $("#cell_planif_ref_gent_saisie").val();
  data["commentaire_libre"] = $("#commentaire_libre").val();
  data["chif_edl_pav_villa_prix_t2"] = $("#chif_edl_pav_villa_prix_t2").val();
  data["chif_edl_pav_villa_prix_t3"] = $("#chif_edl_pav_villa_prix_t3").val();
  data["chif_edl_pav_villa_prix_t4"] = $("#chif_edl_pav_villa_prix_t4").val();
  data["chif_edl_pav_villa_prix_t5"] = $("#chif_edl_pav_villa_prix_t5").val();
  data["chif_edl_pav_villa_prix_t6"] = $("#chif_edl_pav_villa_prix_t6").val();
  data["chif_edl_pav_villa_prix_t7"] = $("#chif_edl_pav_villa_prix_t7").val();
  data["chif_edl_pav_villa_prix_t8"] = $("#chif_edl_pav_villa_prix_t8").val();
  data["chif_appt_prix_f7"] = $("#chif_appt_prix_f7").val();
  data["chif_appt_prix_f8"] = $("#chif_appt_prix_f8").val();
  data["com_as_sur_ca_client"] = $("#com_as_sur_ca_client").val();
  data["cell_tech_ref_agent"] = $("#cell_tech_ref_agent").val();
  data["com_as_sur_client"] = $("#com_as_sur_client").val();
  data["prix_autres"] = $("#prix_autres").val();
  data["taux_meuble"] = $("#taux_meuble").val();

  url = base_local+"/client_app/tarifs/"
  $.ajax({
    type: "POST",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
    success: function (response) {
      $("#editForm").modal('hide')
      alert("Ajout de tarif réussie");
      clearForm();
      window.location.replace("Tarifs.html");
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
  if($.cookie("group") == "Agent secteur" || $.cookie("group") == "Administrateur") {

  }
  else{
    alert('Privilèges inssufisants')
    window.location.replace("dashboard.html");
  }
  url = base_local+"/client_app/tarifs/"+$.cookie("tarif_to_edit")
  $.ajax({
    type: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      console.log(response)
      $('#EDL_prix_std').val(response['edl_prix_std']);
      //$('#nature_du_bien').val(response['meuble']);
      getPropriete(response['meuble'])
      $('#edl_appt_prix_f2').val(response['edl_appt_prix_f2'])	  
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
  data['user_id'] = $.cookie("id_user_edit")
  data["EDL_prix_std"] = $('#edl_prix_std').val();
  data["meuble"] = $('#nature_du_bien').val();	
  data['edl_appt_prix_f2'] = $('#edl_appt_prix_f2').val()	  
  data["edl_appt_prix_f1"] = $("#EDL_appt_prix_f1").val();
  data["edl_appt_prix_f3"] = ($("#edl_appt_prix_f3").val());
  data["edl_appt_prix_f4"] = $("#edl_appt_prix_f4").val();
  data["edl_appt_prix_f5"] = $("#edl_appt_prix_f5").val();
  data["edl_appt_prix_f6"] = $("#edl_appt_prix_f6").val();
  data["edl_pav_villa_prix_t1"] = $("#edl_pav_villa_prix_t1").val();
  data["edl_pav_villa_prix_t2"] = $("#edl_pav_villa_prix_t2").val();
  data["edl_pav_villa_prix_t3"] = $("#edl_pav_villa_prix_t3").val();
  data["edl_pav_villa_prix_t4"] = $("#edl_pav_villa_prix_t4").val();
  data["edl_pav_villa_prix_t5"] = $("#edl_pav_villa_prix_t5").val();
  data["edl_pav_villa_prix_t6"] = $("#edl_pav_villa_prix_t6").val();
  data["edl_pav_villa_prix_t7"] = $("#edl_pav_villa_prix_t7").val();
  data["edl_pav_villa_prix_t8"] = $("#edl_pav_villa_prix_t8").val();
  data["chif_appt_prix_stu"] = $("#chiff_appt_prix_stu").val();
  data["chif_appt_prix_f1"] = $("#chif_appt_prix_f1").val();
  data["chif_appt_prix_f2"] = $("#chif_appt_prix_f2").val();
  data["chif_appt_prix_f3"] = $("#chif_appt_prix_f3").val();
  data["chif_appt_prix_f4"] = $("#chif_appt_prix_f4").val();
  data["chif_appt_prix_f5"] = $("#chif_appt_prix_f5").val();
  data["chif_pav_villa_prix_t1"] = $("#chif_pav_villa_prix_t1").val();
  data["chif_pav_villa_prix_t2"] = $("#chif_pav_villa_prix_t2").val();
  data["chif_pav_villa_prix_t3"] = $("#chif_pav_villa_prix_t3").val();
  data["chif_pav_villa_prix_t4"] = $("#chif_pav_villa_prix_t4").val();
  data["chif_pav_villa_prix_t5"] = $("#chif_pav_villa_prix_t5").val();
  data["chif_pav_villa_prix_t6"] = $("#chif_pav_villa_prix_t6").val();
  data["chif_pav_villa_prix_t7"] = $("#chif_pav_villa_prix_t7").val();
  data["chif_pav_villa_prix_t8"] = $("#chif_pav_villa_prix_t8").val();
  data["code_tva"] = $("#code_tva").val();
  data["com_cell_tech_ref_agent"] = $("#com_cell_tech_ref_agent").val();
  data["referent_as_client"] = $("#referent_as_client").val();
  data["com_as_sur_ca_client"] = $("#com_as_sur_ca_client").val();
  data["com_cell_dev_ref_agent"]= $('#com_cell_dev_ref_agent').val()
  data["com_cell_dev_ref_responsable"] = $("#com_cell_dev_ref_responsable").val();
  data["com_cell_tech_ref_responsable"] = $("#com_cell_tech_ref_responsable").val();
  data["com_cell_tech_ref_suiveur"] = $("#com_cell_tech_ref_suiveur").val();
  data["com_cell_planif_ref_responsable"] = $("#com_cell_planif_ref_responsable").val();
  data["com_cell_planif_ref_suiveur"] = $("#com_cell_planif_ref_suiveur").val();
  data["com_cell_planif_ref_gent_saisie"] = $("#com_cell_planif_ref_gent_saisie").val();
  data["cell_dev_ref_responsable"] = $("#cell_dev_ref_responsable").val();
  data["cell_dev_ref_agent"] = $("#cell_dev_ref_agent").val();
  data["cell_tech_ref_responsable"] = $("#cell_tech_ref_responsable").val();
  data["cell_tech_ref_suiveur"] = $("#cell_tech_ref_suiveur").val();
  data["cell_planif_ref_responsable"] = $("#cell_planif_ref_responsable").val();
  data["cell_planif_ref_suiveur"] = $("#cell_planif_ref_suiveur").val();
  data["cell_planif_ref_gent_saisie"] = $("#cell_planif_ref_gent_saisie").val();
  data["chif_edl_pav_villa_prix_t2"] = $("#chif_edl_pav_villa_prix_t2").val();
  data["chif_edl_pav_villa_prix_t3"] = $("#chif_edl_pav_villa_prix_t3").val();
  data["chif_edl_pav_villa_prix_t4"] = $("#chif_edl_pav_villa_prix_t4").val();
  data["chif_edl_pav_villa_prix_t5"] = $("#chif_edl_pav_villa_prix_t5").val();
  data["chif_edl_pav_villa_prix_t6"] = $("#chif_edl_pav_villa_prix_t6").val();
  data["chif_edl_pav_villa_prix_t7"] = $("#chif_edl_pav_villa_prix_t7").val();
  data["chif_edl_pav_villa_prix_t8"] = $("#chif_edl_pav_villa_prix_t8").val();
  data["chif_appt_prix_f6"] = $("#chif_appt_prix_f6").val();
  data["com_as_sur_ca_client"] = $("#com_as_sur_ca_client").val();
  data["com_as_sur_client"] = $("#com_as_sur_client").val();
  data["commentaire_libre"] = $("#commentaire_libre").val();
  data["cell_tech_ref_agent"] = $("#cell_tech_ref_agent").val();
  data["prix_autres"] = $("#prix_autres").val();
  data["taux_meuble"] = $("#taux_meuble").val();
  data["chif_appt_prix_f8"] = $("#chif_appt_prix_f8").val();
  data["chif_appt_prix_f7"] = $("#chif_appt_prix_f7").val();

  url =base_local+"/client_app/tarifs/"+$.cookie('tarif_to_edit')
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
      window.location.replace("Tarifs.html");
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

function getPropriete(val1 = 0) {
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

