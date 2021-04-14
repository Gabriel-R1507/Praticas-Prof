
var logado = false

window.onload = function () {
    if (logado != true) {
        if (!location.href.includes("entrar.html") && !location.href.includes("registrar.html")) {
            location.href = "entrar.html";
        }
    }
}
async function Entrar() {
    var dadosLog = {};
    dadosLog.user = document.getElementById("txtUser").value;
    dadosLog.senha = document.getElementById("txtSenha").value;

    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLog)
    }
    console.log();
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/calderini', myHeaders);
        const content = await rawResponse.json();

        console.log0("C: "+content);
    }
    catch (ex) {
        console.log("E: " +ex);
    }
}
async function Registrar() {
    var dadosClie = {};
    dadosClie.nome = document.getElementById("txtNome").value;
    dadosClie.user = document.getElementById("txtUser").value;
    dadosClie.senha = document.getElementById("txtSenha").value;
    dadosClie.dtNasc = document.getElementById("txtNascimento").value;
    dadosClie.estado = document.getElementById("txtEstado").value;
    dadosClie.cidade = document.getElementById("txtCidade").value;

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
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Values/adasdasdasd', myHeaders);
        const content = await rawResponse.json();

        console.log0("C: " + content);
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}