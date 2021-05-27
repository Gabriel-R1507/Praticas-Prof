var aval_exemple = "<div class=\"list-aval-unit\"><div class=\"col-1 list-aval-nota\">NotaDaAval</div><div class=\"col-9 list-aval-name\">NomeDoFilme</div><div class=\"col-2 list-aval-joinha\">JoinhasDaAval</div></div>";


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
            if (content != null) {
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
    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetById', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            document.getElementById("user-nome").innerHTML = "<p>" + content.nm_user + "</p>";
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}

async function SolicitarAmizade() {
    let temp = window.location.href.split('=');
    let solAmizade = {};
    solAmizade.user1 = parseInt(temp[1]);
    solAmizade.user2 = JSON.parse(window.sessionStorage.getItem('User'));

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
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Avaliacao/GetByUser', HeadersAmiz);
        const content = await rawResponse.json();
        if (content != null) {
            for (let i = 0; i < content.lenght; i++) {
                let aval = aval_exemple;
                aval = aval.replace("NotaDaAval", content[i].valor);
                aval = aval.replace("NomeDoFilme", content[i].titulo);
                aval = aval.replace("JoinhasDaAval", content[i].Joinha.Lenght);

                document.getElementById("list-aval-content").innerHTML += aval;
            }
        }
        else {
            document.getElementById("action-button").innerHTML = "<div class='user-rows' onClick='SolicitarAmizade()'><div class='btn-amizade col-4 col-md-3 col-lg-2'>Solicitar Amizade <i class='fa fa-user' aria-hidden='true'></i></div></div>"
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }s
    
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
            for (let i = 0; i < content.lenght; i++) {
                let aval = aval_exemple;
                aval = aval.replace("NotaDaAval", content[i].valor);
                aval = aval.replace("NomeDoFilme", content[i].titulo);
                aval = aval.replace("JoinhasDaAval", content[i].Joinha.Lenght);

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
        if (content != null) {
            document.getElementById("list-amigos-titulo").innerHTML += "( " + content + " Em comum )";
        }
        getAmigosEmComum(temp[1], JSON.parse(window.sessionStorage.getItem('User')));
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}