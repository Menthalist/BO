evt = [];
function configCal() {
  calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locales: "fr",
    themeSystem: "bootstrap",
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    selectable: true,
    nowIndicator: true,
    dayMaxEvents: true,
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "dayGridMonth",
    },
    datesSet: function (info) {
      evt = getEvent(info.startStr.split("T")[0], info.endStr.split("T")[0]);
      $(".fc-dayGridMonth-button").text(" ");
      $(".fc-dayGridMonth-button").text("Mois");
      $(".fc-timeGridDay-button").text(" ");
      $(".fc-timeGridDay-button").text("Jours");
      $(".fc-timeGridWeek-button").text(" ");
      $(".fc-timeGridWeek-button").text("Semaine");
      $(".fc-timegrid-axis-cushion").css("display", "none");

      $(".fc-today-button").text(" ");
      $(".fc-today-button").text("Aujourd'hui");
    },
    eventMouseEnter: function (info) {
      date = info.event.start
      console.log(date)	    
      var month = String(date.getUTCMonth() + 1).padStart(2, "0"); //months from 1-12
      var day = String(date.getDate()).padStart(2, "0");
      var year = date.getUTCFullYear()
      dte = day+"/"+month+"/"+year
      tooltip =
        '<div class="tooltiptopicevent" style="opacity:1;width:auto;height:auto;background:#feb811;position:absolute;z-index:10001;padding:10px 10px 10px 10px ;  line-height: 200%;">' +
        "RDV: " +
        " " +
        info.event.title +
        "</br>" +
        "Date: " +
        " " +dte+" Heure: "+info.event.extendedProps.minTime.split(":")[0]+":"+info.event.extendedProps.minTime.split(":")[1]+"</div>";

      $("body").append(tooltip);
      $(this)
        .mouseover(function (e) {
          $(this).css("z-index", 1);
          $(".tooltiptopicevent").fadeIn("500");
          $(".tooltiptopicevent").fadeTo("10", 1.9);
        })
        .mousemove(function (e) {
          $(".tooltiptopicevent").css("top", e.pageY + 10);
          $(".tooltiptopicevent").css("left", e.pageX + 20);
        });
    },
    eventMouseLeave: function (data, event, view) {
      $(this).css("z-index", 8);
      $(".tooltiptopicevent").remove();
    },
    eventClick: function (arg) {
      $.cookie("rdv_to_edit", arg.event._def.publicId);
      window.location.replace("edit_rdv.html");
    },
    eventRender: function (info) {
      var tooltip = new Tooltip(info.el, {
        title: info.event.extendedProps.description,
        placement: "top",
        trigger: "hover",
        container: "body",
      });
    },
  });
  console.log(evt);
  calendar.render();
}
function getEvent(debut, fin) {
  calendar.removeAllEvents();
  $("#waiters").css("display","inline")
  $.ajax({
    type: "GET",
    url: rdv_add_not_paginated,
    data: { debut: debut, fin: fin },
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      response["results"].forEach((elt) => {
        var nom_evt = "";
        if (elt["agent"] != null) {
          nom_evt = elt["agent"]["trigramme"];
        }
        var intervention = "Non Assignée"

        if(elt["intervention"] != null){
          intervention = elt["intervention"]["type"]
        }
        nom_evt = nom_evt + "/" + intervention.slice(0, 3).toUpperCase();
        if (elt["audit_planneur"] != null) {
          nom_evt = nom_evt + "/" + elt["audit_planneur"]["trigramme"];
        }
        nom_evt = nom_evt + "/" + elt["propriete"]["type"];
        nom_evt = nom_evt + "/" + elt["propriete"]["ville"];
        nom_evt = nom_evt + "/" + elt["propriete"]["locataire"]["nom"];
        nom_evt = nom_evt + "/" + elt["client"]["user"]["nom"];
        var couleur = "";
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
        ev = {
          id: elt["id"],
          title: nom_evt,
          start: elt["date"].split("T")[0],
          minTime: elt["date"].split("T")[1],		
          backgroundColor: couleur,
          borderColor: couleur,
        };
        calendar.addEvent(ev);
        evt.push(ev);
      });
      $("#waiters").css("display","none")
    },
    error: function (response) {
      alert("Echec de pRécupération des Rendez-vous");
    },
  });
  return evt;
}

function loadStat() {
  $.ajax({
    type: "GET",
    url: stat_url,
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      $("#nombre_user").text("");
      $("#nombre_admin").text("");
      $("#agent_nombre").text("");
      $("#nombre_client").text("");
      $("#rdv_attente").text("");
      $("#rdv_valide").text("");
      if ($.cookie("group") == "Administrateur") {
        $("#nombre_user").text(response["stats"]["utilisateurs"]);
        $("#nombre_admin").text(response["stats"]["admin"]);
        $("#agent_nombre").text(response["stats"]["agent"]);
        $("#nombre_client").text(response["stats"]["client"]);
        $("#rdv_attente").text(response["stats"]["rdv_attente"]);
        $("#rdv_valide").text(response["stats"]["rdv_valide"]);
      }
      if ($.cookie("group") == "Client pro") {
        $("#adminbox").remove();
        $("#agentbox").remove();
        $("#clientbox").remove();
        $("#clientbox").remove();
        $("#user_box").remove();
        $("#nombre_user").text(response["stats"]["utilisateurs"]);
        $("#nombre_admin").text(response["stats"]["admin"]);
        $("#agent_nombre").text(response["stats"]["agent"]);
        $("#nombre_client").text(response["stats"]["client"]);
        $("#rdv_attente").text(response["stats"]["rdv_attente"]);
        $("#salarie_nombre").text(response["stats"]["salarie"]);
        $("#rdv_valide").text(response["stats"]["rdv_valide"]);
      }

      if ($.cookie("group") == "Agent constat") {
        $("#adminbox").remove();
        $("#agentbox").remove();
        $("#user_box").remove();
        $("#nombre_user").text(response["stats"]["utilisateurs"]);
        $("#nombre_admin").text(response["stats"]["admin"]);
        $("#agent_nombre").text(response["stats"]["agent"]);
        $("#nombre_client").text(response["stats"]["client"]);
        $("#rdv_attente").text(response["stats"]["rdv_attente"]);
        $("#salarie_nombre").text(response["stats"]["salarie"]);
        $("#rdv_valide").text(response["stats"]["rdv_valide"]);
      }

      if ($.cookie("group") == "Audit planneur") {
        $("#adminbox").remove();
        $("#agentbox").remove();
        $("#user_box").remove();
        $("#nombre_user").text(response["stats"]["utilisateurs"]);
        $("#nombre_admin").text(response["stats"]["admin"]);
        $("#agent_nombre").text(response["stats"]["agent"]);
        $("#nombre_client").text(response["stats"]["client"]);
        $("#rdv_attente").text(response["stats"]["rdv_attente"]);
        $("#salarie_nombre").text(response["stats"]["salarie"]);
        $("#rdv_valide").text(response["stats"]["rdv_valide"]);
      }

      if ($.cookie("group") == "Agent secteur") {
        $("#adminbox").remove();
        $("#user_box").remove();
        $("#nombre_user").text(response["stats"]["utilisateurs"]);
        $("#nombre_admin").text(response["stats"]["admin"]);
        $("#agent_nombre").text(response["stats"]["agent"]);
        $("#nombre_client").text(response["stats"]["client"]);
        $("#rdv_attente").text(response["stats"]["rdv_attente"]);
        $("#salarie_nombre").text(response["stats"]["salarie"]);
        $("#rdv_valide").text(response["stats"]["rdv_valide"]);
      }

      if ($.cookie("group") == "Salarie") {
        $("#adminbox").remove();
        $("#user_box").remove();
        $("#agentbox").remove();
        $("#user_box").remove();
        $("#clientbox").remove();
        $("#salariebox").remove();
        $("#nombre_user").text(response["stats"]["utilisateurs"]);
        $("#nombre_admin").text(response["stats"]["admin"]);
        $("#agent_nombre").text(response["stats"]["agent"]);
        $("#nombre_client").text(response["stats"]["client"]);
        $("#rdv_attente").text(response["stats"]["rdv_attente"]);
        $("#salarie_nombre").text(response["stats"]["salarie"]);
        $("#rdv_valide").text(response["stats"]["rdv_valide"]);
      }

      if ($.cookie("group") == "Client pro") {
        $("#adminbox").remove();
        $("#agentbox").remove();
        $("#clientbox").remove();
        $("#clientbox").remove();
        $("#user_box").remove();
        $("#nombre_user").text(response["stats"]["utilisateurs"]);
        $("#nombre_admin").text(response["stats"]["admin"]);
        $("#agent_nombre").text(response["stats"]["agent"]);
        $("#nombre_client").text(response["stats"]["client"]);
        $("#rdv_attente").text(response["stats"]["rdv_attente"]);
        $("#salarie_nombre").text(response["stats"]["salarie"]);
        $("#rdv_valide").text(response["stats"]["rdv_valide"]);
      }

      if ($.cookie("group") == "Client particulier") {
        $("#adminbox").remove();
        $("#agentbox").remove();
        $("#clientbox").remove();
        $("#clientbox").remove();
        $("#user_box").remove();
        $("#salariebox").remove();
        $("#nombre_user").text(response["stats"]["utilisateurs"]);
        $("#nombre_admin").text(response["stats"]["admin"]);
        $("#agent_nombre").text(response["stats"]["agent"]);
        $("#nombre_client").text(response["stats"]["client"]);
        $("#rdv_attente").text(response["stats"]["rdv_attente"]);
        $("#salarie_nombre").text(response["stats"]["salarie"]);
        $("#rdv_valide").text(response["stats"]["rdv_valide"]);
      }
    },
    error: function (response) {
      alert("Echec de récupération des fichiers");
      console.log(response);
    },
  });
}
