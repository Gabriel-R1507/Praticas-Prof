async function Entrar() {
    var dadosLog = {};
    console.log(document.getElementById("divResponse").innerHTML);
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
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetByLogin', myHeaders);
        const content = await rawResponse.json();
        if (content != 0) {

            console.log("C: " + content);
            if (content != null) {
                window.sessionStorage.setItem('User', content);
                //location.href = "https://moviehuntersapp.azurewebsites.net/";
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