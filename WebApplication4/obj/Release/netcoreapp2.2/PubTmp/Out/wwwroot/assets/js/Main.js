
//var logado = false

//window.onload = function () {
//    if (logado != true) {
//        if (!location.href.includes("entrar.html") && !location.href.includes("registrar.html")) {
//            location.href = "entrar.html";
//        }
//    }
//}
async function Entrar() {
    var dadosLog = {};
    dadosLog.email_user = document.getElementById("txtUser").value;
    dadosLog.senha_user = document.getElementById("txtSenha").value;

    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLog)
    }

    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Values/SelectLogin', myHeaders);
        const content = await rawResponse.json();

        console.log("C: " + content);
        location.href = "https://moviehuntersapp.azurewebsites.net/";
    }
    catch (ex) {
        document.getElementById("divResponse").InnerText = "Cadastro não existente"
        console.log("E: " + ex);
    }
}
async function Registrar() {
    var dadosClie = {};
    dadosClie.nm_user = document.getElementById("txtNome").value;
    dadosClie.email_user = document.getElementById("txtUser").value;
    dadosClie.senha_user = document.getElementById("txtSenha").value;
    dadosClie.dt_nasc = document.getElementById("txtNascimento").value;
    dadosClie.estd_user = document.getElementById("txtEstado").value;
    dadosClie.cidd_user = document.getElementById("txtCidade").value;

    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosClie)
    }
    console.log();
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Values/InsetCad', myHeaders);
        const content = await rawResponse.json();

        console.log("C: " + content);3
        if (content.cd_user != null) {
            location.href = "https://moviehuntersapp.azurewebsites.net/";
        }
    }
    catch (ex) {
        document.getElementById("divResponse").InnerText = "Erro ao se cadastrar"
        console.log("E: " + ex);
    }
}