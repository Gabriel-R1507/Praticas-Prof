var itemavaliationsPure =
    "<div class=\"list-aval-unit\">" +
        "<div class=\"col-1 list-aval-nota\" >"+
            "notadaavaliaaco"+
        "</div>"+
        "<div class=\"col-9 list-aval-name\" > <a href=\"usuario.html?user=codigodousuario\">nomedousuario</a></div>"+
        "<div class=\"col-2 list-aval-joinha\" > <p><i class=\"fa fa-thumbs-o-up\" aria-hidden=\"true\"></i> quantidadedelikes</p></div>"+
        "<div class=\"col-11 list-aval-comentario\">comentariodaavaliacao</div>"+
    "</div>";

addLoadEvent(async function () {
    var temp = window.location.href.split('=');
    var item;
    if (typeof temp[1] != "undefined") {
        item = temp[1];

        var myHeaders = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }
        try {
            const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Item/GetById', myHeaders);
            const content = await rawResponse.json();
            if (content != null) {
                document.getElementById("item-nome").innerHTML = "<p>" + content.nm_item + "</p>";
                document.getElementById("item-desc").innerHTML = content.desc_item;
            }
        }
        catch (ex) {
            console.log("E: " + ex);
        }
    }
});


addLoadEvent(async function () {
    var temp = window.location.href.split('=');
    var item;
    var itemavaliations;
    if (typeof temp[1] != "undefined") {
        item = temp[1];

        var myHeaders = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }
        try {
            const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Avaliacao/GetByItem', myHeaders);
            const content = await rawResponse.json();
            if (content != null) {
                for (var i = 0; i < content.length; i++) {
                    itemavaliations = itemavaliationsPure;
                    var nome_usuario = getNomeUsuario(content[i].user);
                    var qtd_avaliacoes = getLikes(content[i].cd_aval);

                    itemavaliations += itemavaliations.replace("notadaavaliaaco", content[i].nota);
                    itemavaliations += itemavaliations.replace("codigodousuario", content[i].user);
                    itemavaliations += itemavaliations.replace("nomedousuario", nome_usuario);
                    itemavaliations += itemavaliations.replace("quantidadedelikes", qtd_avaliacoes);
                    itemavaliations += itemavaliations.replace("comentariodaavaliacao", content[i].comentario);
                    document.getElementById("list-aval-content").innerHTML += itemavaliations;
                }
                document.getElementById("item-desc").innerHTML = content.desc_item;
            }
        }
        catch (ex) {
            console.log("E: " + ex);
        }
    }
});


addLoadEvent(async function () {
    var already = false;
    var div = document.getElementById("avaliacao");

    //fetch a tabela availacao
    if (already) {
        div.innerHTML = "ja avaliou";
    }
});

async function getNomeUsuario(user) {

}

async function getLikes(user) {

}

function rangeChange(range) {
    document.getElementById("testeasdasd").innerHTML = range.value;
}