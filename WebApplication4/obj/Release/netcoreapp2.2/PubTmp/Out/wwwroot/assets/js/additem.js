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
    var link = "";
    var tipo = document.getElementById("Item-type").value;

    dadosCad.titulo = document.getElementById("txt1").value;
    dadosCad.pais = document.getElementById("txt4").value;
    dadosCad.ano = document.getElementById("txt5").value;

    if (tipo == "Filme") {
        dadosCad.diretor = document.getElementById("txt2").value;
        dadosCad.elenco = document.getElementById("txt3").value;
        link = "Filme/InsertFilme";
    }

    if (tipo == "Livro") {
        dadosCad.autor = document.getElementById("txt2").value;
        dadosCad.editora = document.getElementById("txt3").value;
        link = "Livro/InsertLivro";
    }

    if (tipo == "Serie") {
        dadosCad.diretor = document.getElementById("txt2").value;
        dadosCad.elenco = document.getElementById("txt3").value;
        dadosCad.temporadas = document.getElementById("txt6").value;
        link = "Serie/InsertSerie";
    }

    var myHeaders = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosCad)
    }
    try {
        const rawResponse = await fetch('https://moviehuntersapi.azurewebsites.net/' + link, myHeaders);
        const content = await rawResponse.json();
        if (content != null) {

            console.log("C: " + content);
            if (content != 0) {
                window.sessionStorage.setItem('User', content);
                //location.href = "./index.html";
            }
        }
        else {
            document.getElementById("divResponse").innerHTML = "Cadastro não existente";
        }
    }
    catch (ex) {
        console.log("E: " + ex);
        document.getElementById("divResponse").innerHTML = "<div class=\"login-error\"> Cadastro não existente</div>";
    }
}