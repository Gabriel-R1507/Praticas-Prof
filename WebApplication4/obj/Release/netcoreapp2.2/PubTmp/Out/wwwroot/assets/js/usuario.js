addLoadEvent(async function () {
    var user = JSON.parse(window.sessionStorage.getItem('User'))
    document.getElementById("valor-na-sessao").innerHTML = user;
    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    try {
        const rawResponse = await fetch('http://moviehuntersapi.azurewebsites.net/User/GetById', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {

            console.log("C: " + content);
            //if (content != null) {
            //    window.sessionStorage.setItem('User', content);
            //    //location.href = "https://moviehuntersapp.azurewebsites.net/";
            //}
        }
        else {
            console.log("C: Cadastro não existente");
            document.getElementById("divResponse").InnerText = "Cadastro não existente";
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
});

addLoadEvent(function () {
    var user = JSON.parse(window.sessionStorage.getItem('User'))

    var teste = window.location.href.split('=');
    if (typeof teste[1] != "undefined") {
        document.getElementById("action-button").innerHTML = "<div class='user-rows' onClick='SolicitarAmizade()'><div class='btn-amizade col-4 col-md-3 col-lg-2'>Solicitar Amizade <i class='fa fa-user-o' aria-hidden='true'></i></div></div>"
    }
    else {
        document.getElementById("action-button").innerHTML = "<div class='user-rows' onClick='alert()'><div class='btn-editar-dados col-4 col-md-3 col-lg-2'>Editar dados <i class='fa fa-pencil' aria-hidden='true'></i></div></div>"
    }
});

function SolicitarAmizade() {
    alert("amizade");
}