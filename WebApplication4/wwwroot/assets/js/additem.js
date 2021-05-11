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
                "<input type=\"text\" class=\"form-control\" placeholder =\"País\" id=\"txt4\"> " +
            "</div>" +
            "<div class=\"cadastro form-group col-6\">" +
                "<input type=\"number\" class=\"form-control\" placeholder=\"Ano\" id=\"txt5\">" +
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
                        "<input type=\"number\" class=\"form-control\" placeholder=\"Nº Temporadas\" id=\"txt6\">" +
                    "</div>" +
                "</div> ";
            break;
        default: alert();
    }
}


async function CadastrarItem() {
    var dadosCad = {};
    var descTemp = "";
    var tipo = document.getElementById("Item-type").value;

    dadosCad.titulo_item = document.getElementById("txt1").value;
    dadosCad.tipo_item = tipo;
    dadosCad.criador_item = JSON.parse(window.sessionStorage.getItem('User'));

    descTemp += "País: " + document.getElementById("txt4").value;
    descTemp += "/nAno: " + document.getElementById("txt5").value;

    if (tipo == 1) {
        descTemp += "\nDiretor: " + document.getElementById("txt2").value;
        descTemp += "\nElenco: " + document.getElementById("txt3").value;
    }

    if (tipo == "Livro") {
        descTemp += "\nAutor: " + document.getElementById("txt2").value;
        descTemp += "\nEditora: " + document.getElementById("txt3").value;
    }

    if (tipo == "Serie") {
        descTemp += "\nDiretor: " + document.getElementById("txt2").value;
        descTemp += "\nElenco: " + document.getElementById("txt3").value;
        descTemp += "\nNº Temporadas: " + document.getElementById("txt6").value;
    }

    dadosCad.descricao_item = descTemp;

    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCad)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/Item/InsertItem', myHeaders);
        const content = await rawResponse.json();
        if (content != null) {
            console.log("C: " + content);
            if (typeof content == "number") {
                document.getElementById("divResponse").innerHTML = "Item cadastrado com sucesso! (aguardando aprovação de um administrador)";
            }
        }
        else {
            document.getElementById("divResponse").innerHTML = "Erro ao cadastrar Item";
        }
    }
    catch (ex) {
        console.log("E: " + ex);
        document.getElementById("divResponse").innerHTML = "Erro ao cadastrar Item";
    }
}