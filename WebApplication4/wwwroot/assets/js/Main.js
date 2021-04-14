function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

addLoadEvent(function () {
    if (window.sessionStorage.getItem('User') == null) {
        if (!location.href.includes("entrar.html") && !location.href.includes("registrar.html")) {
            location.href = "entrar.html";
        }
    }
})

addLoadEvent(function () {
    fetch('/assets/html/Header.txt')
        .then(response => response.text())
        .then((data) => {
            document.getElementById("headerMenu").innerHTML = data;
        });
});
