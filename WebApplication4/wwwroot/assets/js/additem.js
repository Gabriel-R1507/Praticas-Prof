function AlterForm(input) {
    var formPadrao =
        "<div class=\"form-row pb-3\">" +
        "<div class=\"cadastro form-group col-6\">" +
        "<input type=\"text\" class=\"form-control\" placeholder=\"Titulo\" id=\"txt1\">" +
        "</div>" +
        "<div class=\"cadastro form-group col-6\">" +
        "<input type=\"text\" class=\"form-control\" placeholder=\"Diretor\" id=\"txt2\">" +
        "</div>" +
        "</div>" +
        "<div class=\"form-row pb-3\">" +
        "<div class=\"cadastro form-group col-12\">" +
        "<input type=\"text\" class=\"form-control\" placeholder=\"Elenco\" id=\"txt3\">" +
        "</div > " +
        "</div > " +
        "<div class=\"form-row pb-3\"> " +
        "<div class=\"cadastro form-group col-6\">" +
        "<input type = \"text\" class=\"form-control\" placeholder =\"País\" id=\"txt4\"> " +
        "</div>" +
        "<div class=\"cadastro form-group col-6\">" +
        "<input type = \"text\" class=\"form-control\" placeholder=\"Ano\" id=\"txt5\">" +
        "</div>" +
        "</div>";
    document.getElementById('form-content').innerHTML = formPadrao;
    switch (input.value) {
        case 'Filme':
            document.getElementById('txt2').placeholder = "Diretor";
            document.getElementById('txt3').placeholder = "Elenco";
            break;
        case 'Livro':
            document.getElementById('txt2').placeholder = "Autor";
            document.getElementById('txt3').placeholder = "Editora";
            break;
        case 'Serie':
            document.getElementById('txt2').placeholder = "Diretor";
            document.getElementById('txt3').placeholder = "Elenco";
            document.getElementById('form-content').innerHTML = document.getElementById('form-content').innerHTML +
                "<div class=\"form-row pb-3\">" +
                    "<div class=\"cadastro form-group col-12\">" +
                        "<input type=\"text\" class=\"form-control\" placeholder=\"Elenco\" id=\"txt3\">" +
                    "</div>" +
                "</div> ";
            break;
        default: alert();
    }
}


function CadastrarItem() {
    alert();
    var tipo = document.getElementById("");
}