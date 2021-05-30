var notification_example = "<div class=\"notif-row\">" +
                                "<div class=\"col-1 list-amigos-img\">" +
                                    "<img class=\"img-profile\" src=\"assets/img/user-image.jpg\" />" +
                                "</div>" +
                                "<div class=\"col-6 user-nome\">" +
                                    "<p>nomeDoUsuario</p>" +
                                "</div>" +
                                "<div class=\"col-4 notif-buttons\">" +
                                    "<div class=\"notif-button accpet\" Onclick=\"Aceitar(CodigoDaAmizade)\">V</div>" +
                                    "<div class=\"notif-button recuse\" Onclick=\"Negar(CodigoDaAmizade)\">F</div>" +
                                "</div>" +
                            "</div>";

addLoadEvent(async function () {
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(window.sessionStorage.getItem('User'))
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Amizade/GetAmizadeByRecebidor', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            for (let i = 0; i < content.length; i++) {
                let notific_actual = notification_example;
                notific_actual = notific_actual.replace("nomeDoUsuario", content[i].solicitante_amizade);
                notific_actual = notific_actual.replaceAll("CodigoDaAmizade", content[i].cd_amizade);

                document.getElementById("notification-list").innerHTML += notific_actual;

                if (i + 1 < content.length) {
                    document.getElementById("notification-list").innerHTML += "<hr style=\"width:80%; margin-left:10%;\">";
                }
            }
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
});




async function Aceitar(cd) {
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cd)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Amizade/AceitarAmizade' , myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            location.href = location.href;
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}
async function Negar(cd) {
    let myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cd)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Amizade/NegarAmizade' , myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            location.href = location.href;
        }
    }
    catch (ex) {
        console.log("E: " + ex);
    }
}
