var aval_exemple = "<div class=\"list-aval-unit\"><div class=\"col-1 list-aval-nota\">NotaDaAval</div><div class=\"col-9 list-aval-name\">NomeDoFilme</div><div class=\"col-2 list-aval-joinha\" Onclick=\"DarLike(CdDaAvaliacao)\"> <p><i class=\"fa fa-thumbs-o-up\" aria-hidden=\"true\"></i> JoinhasDaAval</p></div></div>";
let amig_exemple = "<div class=\"list-amigos-unit\">"+
                        "<div class=\"col-1 list-amigos-img\">"+
                            "<img class=\"img-profile\" src=\"assets/img/user-image.jpg\"/>"+
                        "</div>"+
                        "<div class=\"col-11 list-amigos-name\"><a href=\"usuario.html?user=CodigoDoAmigo\">NomeDoAmigo</div>"+
                    "</div>";

//checa metodo get para alterar botao e chca se ja existe amizade
addLoadEvent(async function () {
    let temp = window.location.href.split('=');
    let getAmizade = {};
    let user;
    if (typeof temp[1] != "undefined" && temp[1] != JSON.parse(window.sessionStorage.getItem('User'))) {
        user = temp[1];
        
        getAmizade.user1 = parseInt(temp[1]);
        getAmizade.user2 = JSON.parse(window.sessionStorage.getItem('User'));
        let HeadersAmiz = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(getAmizade)
        }
        try {
            const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Amizade/GetAmizade', HeadersAmiz);
            const content = await rawResponse.json();
            if (content.cd_amizade != undefined) {
                document.getElementById("action-button").innerHTML = "<div class='user-rows' onClick='DesfazerAmizade()'><div class='btn-amizade col-4 col-md-3 col-lg-2'>Desfazer Amizade <i class='fa fa-user-o' aria-hidden='true'></i></div></div>"
            }
            else {
                document.getElementById("action-button").innerHTML = "<div class='user-rows' onClick='SolicitarAmizade()'><div class='btn-amizade col-4 col-md-3 col-lg-2'>Solicitar Amizade <i class='fa fa-user' aria-hidden='true'></i></div></div>"
            }
        }
        catch (ex) {
            console.log("E: " + ex);
        }
        getAmigosEmComum(temp[1], JSON.parse(window.sessionStorage.getItem('User')));
    }
    else {
        user = JSON.parse(window.sessionStorage.getItem('User'));
        document.getElementById("action-button").innerHTML = "<div class='user-rows'><a href=\"alteracoes.html\"class='btn-editar-dados col-4 col-md-3 col-lg-2' >Editar dados <i class='fa fa-pencil' aria-hidden='true'></i></a></div>"
    }
    getActualUserInfo(user);
    getAmizades(user);
    getAvaliacoes(user);
});

async function getActualUserInfo(user) {
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    try {
        const rawResponse1 = await fetch('https://moviehuntersapi.azurewebsites.net/Joinha/TotalPerUser', myHeaders);
        const total = await rawResponse1.json();
        const rawResponse2 = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetById', myHeaders);
        const content = await rawResponse2.json();
        if (content != null) {

            document.getElementById("user-nome").innerHTML = "<p>" + content.nm_user + " - " + total +"<i class=\"fa fa-thumbs-o-up\" aria-hidden=\"true\"></i></p>";
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }

    try {
        
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}

async function SolicitarAmizade() {
    let temp = window.location.href.split('=');
    let solAmizade = {};
    solAmizade.user1 = JSON.parse(window.sessionStorage.getItem('User'));
    solAmizade.user2 = parseInt(temp[1]);
    
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(solAmizade)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Amizade/CreateAmizade', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            location.href = location.href;
        }
        else {
            console.log("E: " + content);
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}

async function DesfazerAmizade() {
    var temp = window.location.href.split('=');
    var desAmizade = {};
    desAmizade.user1 = parseInt(temp[1]);
    desAmizade.user2 = JSON.parse(window.sessionStorage.getItem('User'));

    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(desAmizade)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Amizade/DeleteAmizade', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            location.href = location.href;
        }
        else {
            console.log("E: " + content);
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}

async function getAmizades(user) {
    let HeadersAmiz = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Amizade/GetAmizadeUserPage', HeadersAmiz);
        const content = await rawResponse.json();
        if (content != null) {
            for (let i = 0; i < content.length; i++) {
                let amig = amig_exemple;
                amig = amig.replace("CodigoDoAmigo", content[i].cd_amigo);
                amig = amig.replace("NomeDoAmigo", content[i].nm_amigo);
                document.getElementById("list-amigos-content").innerHTML += amig;
            }
        }
        else {
            console.log("E: " + ex);
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}

async function getAvaliacoes(user) {
    let HeadersAmiz = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Avaliacao/GetByUser', HeadersAmiz);
        const content = await rawResponse.json();
        if (content != null) {
            console.log(content);
            for (let i = 0; i < content.length; i++) {
                let aval = aval_exemple;
                aval = aval.replace("NotaDaAval", content[i].valor);
                aval = aval.replace("NomeDoFilme", content[i].item);
                aval = aval.replace("JoinhasDaAval", content[i].joinhas.length);
                aval = aval.replace("CdDaAvaliacao", content[i].cd_aval);

                for (let a = 0; a < content[i].joinhas.length; a++) {
                    if (content[i].joinhas[a].usuario == window.sessionStorage.getItem('User')) {
                        aval = aval.replace("DarLike", "RemoverLike");
                        aval = aval.replace("fa-thumbs-o-up", "fa-thumbs-up");
                    }
                }

                document.getElementById("list-aval-content").innerHTML += aval;
            }
        }
        else {
            document.getElementById("action-button").innerHTML = "<div class='user-rows' onClick='SolicitarAmizade()'><div class='btn-amizade col-4 col-md-3 col-lg-2'>Solicitar Amizade <i class='fa fa-user' aria-hidden='true'></i></div></div>"
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}

async function getAmigosEmComum() {

    let getAmizade = {};
    let temp = window.location.href.split('=');
    getAmizade.user1 = parseInt(temp[1]);
    getAmizade.user2 = JSON.parse(window.sessionStorage.getItem('User'));

    let HeadersAmiz = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getAmizade)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetComum', HeadersAmiz);
        const content = await rawResponse.json();
        if (content != null) {
            console.log(content);
            document.getElementById("list-amigos-titulo").innerHTML += "( " + content + " Em comum )";
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}

async function DarLike(aval) {
    joinhaDTO = {}
    joinhaDTO.avaliacao = aval;
    joinhaDTO.usuario = JSON.parse(window.sessionStorage.getItem('User'));

    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(joinhaDTO)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Joinha/CreateJoinha', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            location.href = location.href;
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}

async function RemoverLike(aval) {
    joinhaDTO = {}
    joinhaDTO.avaliacao = aval;
    joinhaDTO.usuario = JSON.parse(window.sessionStorage.getItem('User'));

    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(joinhaDTO)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Joinha/DeleteJoinha', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            location.href = location.href;
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}