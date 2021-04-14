addLoadEvent(function () {
    var user = JSON.parse(window.localStorage.getItem('User'))
    alert(user);
});
