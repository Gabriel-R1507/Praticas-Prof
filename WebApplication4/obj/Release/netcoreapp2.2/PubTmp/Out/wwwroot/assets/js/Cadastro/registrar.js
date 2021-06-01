
async function Registrar() {
    var dadosClie = {};
    dadosClie.nm_user = document.getElementById("txtNome").value;
    dadosClie.email_user = document.getElementById("txtUser").value;
    dadosClie.senha_user = document.getElementById("txtSenha").value;
    dadosClie.dt_nasc = document.getElementById("txtNascimento").value;
    dadosClie.estd_user = document.getElementById("slcEstado").value;
    dadosClie.cidd_user = document.getElementById("txtCidade").value;
    dadosClie.tipo = 1;

    if (CamposValidos(dadosClie)) {
        if (ValidacaoNewUser(document.getElementById("txtUser").value)) {
            let myHeaders = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosClie)
            }

            try {
                const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/InsertClie', myHeaders);
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
    }
    else {
        <div id="divResponse"></div>
    }
}

async function ValidacaoNewUser(username) {
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(username)
    }

    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetByUsername', myHeaders);
        const content = await rawResponse.json();

        if (typeof content == "number") {
            return false;
        }
        else {
            return true;
        }
    }
    catch (ex) {
        console.log("E: " + ex);
        return false;
    }
}

function CamposValidos(cadastro) {
    if (cadastro.nm_user == "" || cadastro.email_user == "" || cadastro.senha_user == "" || cadastro.dt_nasc == "" || cadastro.estd_user == "" || cadastro.cidd_user =="") {
        return false;
    }
    return true;
}