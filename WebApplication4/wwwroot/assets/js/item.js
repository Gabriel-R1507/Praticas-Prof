var itemavaliationsPure =
    "<div class=\"list-aval-unit\">" +
        "<div class=\"col-1 list-aval-nota\" >"+
            "notadaavaliaaco"+
        "</div>"+
        "<div class=\"col-9 list-aval-name\" > <a href=\"usuario.html?user=codigodousuario\">nomedousuario</a></div>"+
        "<div Onclick=\"DarLike(CdDaAvaliacao)\" class=\"col-2 list-aval-joinha\" > <p><i class=\"fa fa-thumbs-o-up\" aria-hidden=\"true\"></i> quantidadedelikes</p></div>"+
        "<div class=\"col-11 list-aval-comentario\">comentariodaavaliacao</div>"+
    "</div>";

//nome e descrição do filme
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

//avaliacoes de outros usuarios
addLoadEvent(async function () {
    let temp = window.location.href.split('=');
    let item;
    let itemavaliations;

    if (typeof temp[1] != "undefined") {
        item = temp[1];

        let myHeaders = {
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

                content.sort((a, b) => {
                    if (a.joinhas.length > b.joinhas.length) { return -1; }
                    if (a.joinhas.length < b.joinhas.length) { return 1; }
                    return 0;
                });

                for (var i = 0; i < content.length; i++) {
                    itemavaliations = itemavaliationsPure;

                    itemavaliations += itemavaliations.replace("notadaavaliaaco", content[i].nota);
                    itemavaliations += itemavaliations.replace("codigodousuario", content[i].cd_user);
                    itemavaliations += itemavaliations.replace("nomedousuario", content[i].nm_user);
                    itemavaliations += itemavaliations.replace("CdDaAvaliacao", content[i].aval);
                    itemavaliations += itemavaliations.replace("quantidadedelikes", content[i].joinhas.lenght);
                    itemavaliations += itemavaliations.replace("comentariodaavaliacao", content[i].comentario);

                    for (let a = 0; a < content[i].joinhas.lenght; a++) {
                        if (content[i].joinhas[a].usuario == window.sessionStorage.getItem('User')) {
                            itemavaliations += itemavaliations.replace("DarLike", "RemoverLike");
                        }
                    }

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

//checa se o usuario atual ja fez avaliacao
addLoadEvent(async function () {
    var already = false;
    var div = document.getElementById("avaliacao");

    //fetch a tabela availacao
    if (already) {
        div.innerHTML = "ja avaliou";
    }
});

async function Avaliar() {
    let aval = {};
    let temp = window.location.href.split('=');
    aval.item = temp[1];
    aval.valor = document.getElementById("points").value;
    aval.usuario = window.sessionStorage.getItem('User');
    aval.comentario = document.getElementById("item-desc").value;

    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aval)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Avaliacao/CreateAvaliacao', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            alert();
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}

async function DarLike() {

}

async function RemoverLike() {

}