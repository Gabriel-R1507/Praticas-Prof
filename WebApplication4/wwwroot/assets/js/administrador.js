addLoadEvent(async function () {
    if (window.sessionStorage.getItem('User') != null) {

        let myHeaders = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(window.sessionStorage.getItem('User'))
        }
        try {
            const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetById', myHeaders);
            const content = await rawResponse.json();
            if (content != null) {
                if (typeof content.tipo == "undefined" || content.tipo != 2) {
                    location.href = "entrar.html";
                }
            }
            else {
                location.href = "entrar.html";
            }
        }
        catch (ex) {
            location.href = "entrar.html";
        }
    }
    else {
        location.href = "entrar.html";
    }
})

//media de amigos
addLoadEvent(async function () {
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Amizade/GetMedAmigos', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            if (typeof content == "number") {
                document.getElementById("MediaAmigos").innerHTML += content;
            }
        }
        else {
            console.log("Erro ao pegar média");
        }
    }
    catch (ex) {
        console.log("Erro ao pegar média");
    }
})

//itens pra aprovar
addLoadEvent(async function () {
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Item/GetItensToAprove', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            for (i = 0; i < content.length; i++) {
                MontarAceite(content[i]);
            }
        }
        else {
            console.log("Erro ao pegar itens");
        }
    }
    catch (ex) {
        console.log("Erro ao pegar itens");
    }
});

//usuario mais conectado do ultimo mes
addLoadEvent(async function () {
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetMostConected', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            document.getElementById("most-conected").innerHTML += "<br>" + content;
        }
        else {
            console.log("Erro ao pegar itens");
        }
    }
    catch (ex) {
        console.log("Erro ao pegar itens");
    }
});

var aceitar_Item_Exemple =
    "<div class=\"list-aprov-unit\">"+
        "<div class=\"item-rows\">"+
            "<div class=\"col-6 col-md-4 col-lg-3\">"+
                "<img class=\"img-profile\" src=\"assets/img/filmLogo.png\" />"+
        "</div>" +
        "</div>"+
        "<div class=\"item-rows\">"+
            "<div class=\"item-nome\">"+
                "<p>NomeDoItem</p>"+
            "</div>"+
        "</div>"+
        "<div class=\"item-rows col-12\">"+
            "<textarea id=\"item-desc\" style=\"width:100%;height:150px;resize:none;\" disabled>DescricaoDoItem</textarea>"+
        "</div>"+
        "<div class=\"col-12 mt-3 mb-3 notif-buttons\">"+
            "<div class=\"notif-button accpet\" Onclick=AceitarItem(CodigoDoItem)>Aceitar</div>"+
            "<div class=\"notif-button recuse\" Onclick=NegarItem(CodigoDoItem)>Negar</div>"+
        "</div >"+
    "</div >";



function MontarAceite(item) {

    let aceitar_Item = aceitar_Item_Exemple;
    aceitar_Item = aceitar_Item.replace("NomeDoItem", item.titulo_item);
    aceitar_Item = aceitar_Item.replace("DescricaoDoItem", item.descricao_item);
    aceitar_Item = aceitar_Item.replaceAll("CodigoDoItem", item.cd_item);
    document.getElementById("list-aprov-content").innerHTML += aceitar_Item;
}

async function AceitarItem(cd) {
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: cd
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Item/Aprovar', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            if (typeof content == "number") {
                location.href = location.href;
            }
        }
        else {
            console.log("Erro ao pegar itens");
        }
    }
    catch (ex) {
        console.log("Erro ao pegar itens");
    }
}

async function NegarItem(cd) {
    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: cd
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Item/Negar', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            if (typeof content.tipo == "undefined" || content.tipo != 2) {
                location.href = "entrar.html";
            }
        }
        else {
            location.href = "entrar.html";
        }
    }
    catch (ex) {
        location.href = "entrar.html";
    }
}