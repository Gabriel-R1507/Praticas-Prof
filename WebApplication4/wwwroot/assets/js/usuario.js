addLoadEvent(function () {
    var user = JSON.parse(window.sessionStorage.getItem('User'))
    document.getElementById("valor-na-sessao").innerHTML = user;
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
        if (content != 0) {

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
