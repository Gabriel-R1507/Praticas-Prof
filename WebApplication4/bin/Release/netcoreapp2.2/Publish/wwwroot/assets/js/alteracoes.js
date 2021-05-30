addLoadEvent(async function () {
    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.parse(window.sessionStorage.getItem('User')))
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetById', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            document.getElementById("user-nome").innerHTML = "<p>" + content.nm_user + "</p>";
            document.getElementById("txtNome").value = content.nm_user;
            var teste = content.dt_nasc.split('T');
            document.getElementById("txtNascimento").value = teste[0];
            document.getElementById("slcEstado").value = content.estd_user;
            document.getElementById("txtCidade").value = content.cidd_user;
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
});

async function Salvar() {
    var dadosClie = {};
    dadosClie.cd_user = JSON.parse(window.sessionStorage.getItem('User'));
    dadosClie.nm_user = document.getElementById("txtNome").value;
    dadosClie.dt_nasc = document.getElementById("txtNascimento").value;
    dadosClie.estd_user = document.getElementById("slcEstado").value;
    dadosClie.cidd_user = document.getElementById("txtCidade").value;

    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosClie)
    }

    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/UpdateClie', myHeaders);
        const content = await rawResponse.json();

        console.log("C: " + content);
        if (content != null) {
            if (content == JSON.parse(window.sessionStorage.getItem('User'))) {

                location.href = "./usuario.html";
            }
        }
    }
    catch (ex) {
        document.getElementById("divResponse").InnerText = "Erro ao se cadastrar"
        console.log("E: " + ex);
    }
}