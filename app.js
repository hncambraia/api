const options = {
    method: 'GET',
    mode: 'cors'
}
var dataCotacao


function formataData(dataAFortmatar) {


    var dd = String(dataAFortmatar).substring(10, 8);
    var mm = String(dataAFortmatar).substring(7, 5); //January is 0!
    var yyyy = String(dataAFortmatar).substring(0, 4); //January is 0!
    novaData = dd + "/" + mm + "/" + yyyy
    return novaData
}

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}
texto = ""
fetch('https://prod-110.westus.logic.azure.com/workflows/e50f80756b9b43baa71d055fbee3d9c6/triggers/manual/paths/invoke/tipo/Cotacao?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MUPtVkRaZGh1maM7uzFu2cmmaebhC1aKvLcfMfhirw0', options)
    .then(response => {
        response.json()

            .then(data => {
                // console.log(data)
                for (index = 0; index < data.value.length; index++) {
                    dataCotacao = formataData(data.value[index].Data)
                    texto += "Data: " + dataCotacao + " - R$ " + data.value[index].Valor + ",00 "

                }
                document.getElementById("texto").innerHTML += "<marquee >" + texto + "</marquee>"

            })

    })
    .catch(e => {
        console.log("ERRO: " + e)
    })


textoReceitas = ""

fetch('https://prod-110.westus.logic.azure.com/workflows/e50f80756b9b43baa71d055fbee3d9c6/triggers/manual/paths/invoke/tipo/Receitas?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MUPtVkRaZGh1maM7uzFu2cmmaebhC1aKvLcfMfhirw0', options)
    .then(response => {
        response.json()

            .then(data => {
                //console.log(data)
                for (index = 0; index < data.value.length; index++) {
                    var Ingredientes = []
                    var lista=""
                    Ingredientes = titleCase(data.value[index].Ingredientes).split("\n")

             
            
                    for (indexIngredientes = 0; indexIngredientes < Ingredientes.length; indexIngredientes++) {
                        item = "<li>" + Ingredientes[indexIngredientes] + "</li>"
                        lista +=item
                         
                    }
                    var modoPerparo = []
                    var listaModoPerparo=""
                    var itemModo=""
                    modoPerparo = titleCase(data.value[index].ModoPreparo).split("\n")

             
            
                    for (indexmodoPerparo = 0; indexmodoPerparo < modoPerparo.length; indexmodoPerparo++) {
                        itemModo = "<li>" + modoPerparo[indexmodoPerparo] + "</li>"
                        listaModoPerparo +=itemModo
                         
                    }
                    console.log( "<ul>" +lista + "</ul>")
                    //item = "<ul>" + itemIngredientes + "</ul>"
                    textoReceitas += "<b>Título: </b>" + titleCase(data.value[index].Titulo) +
                        " <br><b>Ingredientes:</b>" + lista
                        +


                        "<br> <b>Modo de Preparo:</b>"
                        + listaModoPerparo + "<br> <img src='" + data.value[index].Imagem + "'><br>"

                }
                document.getElementById("receita").innerHTML += textoReceitas


            })

    })
    .catch(e => {
        console.log("ERRO: " + e)
    })
