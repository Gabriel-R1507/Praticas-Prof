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
        const rawResponse = await fetch('http://moviehuntersapi.azurewebsites.net/User/InsertClie', myHeaders);
        const content = await rawResponse.json();

        console.log("C: " + content);
        if (content != null) {
            window.sessionStorage.setItem('User', content);
            location.href = "./index.html";
        }
    }
    catch (ex) {
        document.getElementById("divResponse").InnerText = "Erro ao se cadastrar"
        console.log("E: " + ex);
    }
}