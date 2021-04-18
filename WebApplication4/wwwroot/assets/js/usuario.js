addLoadEvent(function () {
    var user = JSON.parse(window.sessionStorage.getItem('User'))
    document.getElementById("valor-na-sessao").innerHTML = user;
    alert(user);
});
