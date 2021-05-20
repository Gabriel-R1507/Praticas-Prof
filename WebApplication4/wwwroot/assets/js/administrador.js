//addLoadEvent(function () {
//    if (window.sessionStorage.getItem('User') != null) {

//        var myHeaders = {
//            method: 'POST',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify(window.sessionStorage.getItem('User'))
//        }
//        try {
//            const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/User/GetById', myHeaders);
//            const content = await rawResponse.json();
//            if (content != null) {
//                if (typeof content.tipo == "undefined" || content.tipo != 2) {
//                    location.href = "entrar.html";
//                }
//            }
//            else {
//                location.href = "entrar.html";
//            }
//        }
//        catch (ex) {
//            location.href = "entrar.html";
//        }
//    }
//    else {
//        location.href = "entrar.html";
//    }
//})


