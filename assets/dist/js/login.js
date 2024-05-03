var Url = "http://195.15.218.172"
function login(){
    $('#login_error').css('display','none')
    $.ajax({
        type: 'POST',
        url: Url+"/manager_app/login/",
        data: {"username":$('#username').val(),"password":$('#password').val()},
        success: function(response)
        {
            $.cookie('agent_user_logged') //to set
            $.cookie('name', response["user"]["nom"])
            $.cookie('id_logged_user_user', response["user"]["id"])
            $.cookie('first_name', response["user"]["prenom"])
            $.cookie('email', response["user"]["email"])
            $.cookie('group', response["user"]["group"])
            $.cookie('id_user_logged', response["id"])
            $.cookie('token', response["tokens"]["access"])
            $.cookie('refresh', response["tokens"]["refresh"])
            // if($.cookie("group") == "Client pro" || $.cookie("group") == "Client particulier"){
            //     if(response["info_concession"] != null && response["info_concession"]["agent_rattache"] != null ){
            //         $.cookie("id_agent",response["info_concession"]["agent_rattache"]['id'])
            //         var nom = response["info_concession"]["agent_rattache"]['nom']+" "+response["info_concession"]["agent_rattache"]['prenom']
            //         $.cookie("nom_agent",nom)
            //         $.cookie("societe_client_sal",response["societe"]);
            //         $.cookie("adresse",response["adresse"]);
            //         $.cookie("telephone",response["telephone"]);
            //         $.cookie("id_user_agent",response["info_concession"]["agent_rattache"]['user']);
            //     }else{
            //         $.cookie("id_agent","vide")
            //         $.cookie("nom_agent","vide")
            //     }   
            // }
            if($.cookie("group") == "Agent constat"){
                $.cookie("id_agent",response["agent_secteur"]["id"]) 
                var nom = response["agent_secteur"]["nom"]+" "+response["agent_secteur"]["prenom"]
                $.cookie("nom_agent",nom)
                $.cookie("id_user_agent",response["agent_secteur"]["id_user"]) 
            }
            if($.cookie("group") == "Salarie"){
                
                if(response["client"]!=null){
                    $.cookie("nom_agent",response["client"]["agent_nom"])
                    $.cookie("prenom_agent",response["client"]["agent_prenom"])                    
                    $.cookie("id_client_sal",response["client"]["id"])
                    $.cookie("nom_client_sal",response["client"]["nom"])
                    $.cookie("email_client_sal",response["client"]["email"])
                    $.cookie("prenom_client_sal",response["client"]["prenom"])
                    //$.cookie("tel_client_sal",response["client"]["prenom"])
                    $.cookie("societe_client_sal",response["client"]["societe"])
                    $.cookie("id_user_agent",response["client"]["agent_user"])
		    $.cookie('id_user_client',response['client']['user_id'])
                }
                else{
                    $.cookie("id_client_sal",0)
                    $.cookie("nom_client_sal",0)
                    $.cookie("societe_client_sal",0)
                    $.cookie("id_user_agent",0)
                }
                //id de l'agent du client responsable de ce salarié
            }
            window.location.replace("dashboard.html")
        },
        error: function(response){
            $('#login_error').css('display','inline')
        }
    })
}

function logout(){
    $.cookie('name',null)
    $.cookie('first_name',null)
    $.cookie('email',null)
    $.cookie('group',null)
    $.cookie('id_user_logged',null)
    $.cookie('token',null)
    $.cookie('refresh',null)
    $.ajax({
        type: 'GET',
        url: Url+"/manager_app/logout/",
        headers: {
            'Authorization':"Bearer "+token
        },
        success: function(response){
            //$('#user_link').css("display","none")
            window.location.replace("login.html")
        },
        error: function(response){

        }
    })
}
$('#logout').on('click',function(){
    logout()
})
function checkLoged(){
    if($.cookie('token') == "null" || $.cookie('refresh') == "null"){
        window.location.replace("login.html")
    }
}

function loadNav(){
    var text = "Bienvenue "+$.cookie("first_name")+" "+$.cookie("name")
    
    text = text +"<br><center>"+$.cookie('group')+"</center>"
	$("#name_user").html(text)
    if($.cookie('group') == "Salarie"){
        $('#user_link').remove()
        $('#param_link').remove()
    }
    if($.cookie('group') == "Client pro"){
        $('#users_edit').remove()
        $('#users_add').empty()
        $('#users_add').append('<label for="exampleInputEmail1">Role</label>\
        <select class="form-control undefined" name="role" id="type_user">\
          <option value="7">Salarie</option>\
        </select>')
        $('#param_link').remove()
        $('#add_user_link').remove()
        $('#edit_part').remove()
    }
    if($.cookie('group') == "Client particulier"){
        $('#user_link').remove()
        $('#param_link').remove()
    }
    if($.cookie('group') == "Agent constat"){
        $('#users_edit').remove()
        $('#param_link').remove()
        $('#user_link').remove()
    }
    if($.cookie('group') == "Agent secteur"){
        $('#type_user').empty()
        $('#type_user').append('\
          <option value="5">Client Professionnel</option>\
          <option value="6">Client Particulier</option>\
          <option value="7">Salarie</option>')
        $('#users_edit').remove()
        $('#param_link').remove()
    }
    if($.cookie('group') == "Audit planneur"){
        $('#users_edit').remove()
        $('#param_link').remove()
        $('#user_link').remove()
    }
}
$("#goLogin").on('click',function(){
    login()
})
function asOnly(){
    if($.cookie('group') == "Client particulier" || $.cookie('group') == "Audit planneur" || $.cookie('group') == "Agent constat" || $.cookie('group') == "Salarie" ){
        alert("Privilèges insuffisants")
        window.location.replace("dashboard.html")
    }
}
