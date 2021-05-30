async function Entrar() {
    var dadosLog = {};
    console.log(document.getElementById("divResponse").innerHTML);
    dadosLog.email_user = document.getElementById("txtUser").value;
    dadosLog.senha_user = document.getElementById("txtSenha").value;

    let LoginHeaders = {
        method: 'POST',
        headers: {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(dadosLog)
    }

    try {
        const rawResponse1 = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetByLogin', LoginHeaders);
        const content = await rawResponse1.json();
        if (typeof content == "number") {
            window.sessionStorage.setItem('User', content);

            var TypeHeaders = {
                method: 'POST',
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(content)
            }
            const rawResponse2 = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetById', TypeHeaders);
            const content = await rawResponse2.json();
            if (content != null) {
                if (content.tipo = 1) {
                    location.href = "./index.html";
                }
                if (content.tipo = 1) {
                    location.href = "./administrador.html";
                }
            }
        }
        else {
            document.getElementById("divResponse").innerHTML = "Cadastro não existente";
        }
    }
    catch (ex) {
        console.log("E: " + ex);
        document.getElementById("divResponse").innerHTML = "<div class=\"login-error\"> Cadastro não existente</div>";
    }
}