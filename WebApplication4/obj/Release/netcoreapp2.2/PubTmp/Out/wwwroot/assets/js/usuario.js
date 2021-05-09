addLoadEvent(async function () {
    var user = JSON.parse(window.sessionStorage.getItem('User'));
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

addLoadEvent(async function () {
    var temp = window.location.href.split('=');
    var getAmizade = {};

    if (typeof temp[1] != "undefined" && temp[1] != JSON.parse(window.sessionStorage.getItem('User'))) {

        getAmizade.user1 = parseInt(temp[1]);
        getAmizade.user2 = JSON.parse(window.sessionStorage.getItem('User'));
        var myHeaders = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getAmizade)
        }
        try {
            const rawResponse = await fetch('http://moviehuntersapi.azurewebsites.net/Amizade/GetAmizade', myHeaders);
            const content = await rawResponse.json();
            if (content != null) {

                console.log("C: " + content);
                //if (content != null) {
                //}
            }
            else {
                console.log("C: Cadastro não existente");
            }
        }
        catch (ex) {
            console.log("E: " + ex);
        }

        document.getElementById("action-button").innerHTML = "<div class='user-rows' onClick='SolicitarAmizade()'><div class='btn-amizade col-4 col-md-3 col-lg-2'>Solicitar Amizade <i class='fa fa-user-o' aria-hidden='true'></i></div></div>"
    }
    else {
        document.getElementById("action-button").innerHTML = "<div class='user-rows' onClick='alert()'><div class='btn-editar-dados col-4 col-md-3 col-lg-2'>Editar dados <i class='fa fa-pencil' aria-hidden='true'></i></div></div>"
    }
});

async function SolicitarAmizade() {
    var temp = window.location.href.split('=');
    var solAmizade = {};
    solAmizade.user1 = parseInt(temp[1]);
    solAmizade.user2 = JSON.parse(window.sessionStorage.getItem('User'));

    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solAmizade)
    }
    try {
        const rawResponse = await fetch('http://moviehuntersapi.azurewebsites.net/Amizade/CreateAmizade', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {

            console.log("C: " + content);
        }
        else {
            console.log("E:: " + content);
        }
    }
    catch (ex) {
        console.log("E: " + ex);
        //document.getElementById("divResponse").innerHTML = "<div class=\"login-error\"> Cadastro não existente</div>";
    }
}