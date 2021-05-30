async function Pesquisar() {
    var searchHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(document.getElementById("txtpesquisa").value)
    }

    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Item/GetByName', searchHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            var TextResult = "";
            for (var i = 0; i < content.length; i++) {
                TextResult += "<a href=\"item.html?item=" + content[i].cd_item + "\" a>" + content[i].titulo_item + "</a><br>";
            }
            document.getElementById("ItensResult").innerHTML = TextResult;
        }
        else {
            document.getElementById("ItensResult").innerHTML = "Nada";
        }
    }
    catch (ex) {
        console.log("E: " + ex);
        document.getElementById("ItensResult").innerHTML = "Erro";
    }

    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetByName', searchHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            var TextResult = "";
            for (var u = 0; u < content.length; u++) {
                TextResult += "<a href=\"usuario.html?user=" + content[u].cd_user+"\" a>"+ content[u].nm_user + "</a><br>";
            }
            document.getElementById("usuariosresult").innerHTML = TextResult;
        }
        else {
            document.getElementById("usuariosresult").innerHTML = "Nada";
        }
    }
    catch (ex) {
        console.log("E: " + ex);
        document.getElementById("usuariosresult").innerHTML = "Erro";
    }
}