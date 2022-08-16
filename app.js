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
function recuperaCotacoes(){
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
    
    
}



function trataListas(list){
   var lista=""
          
    for (indexIngredientes = 0; indexIngredientes < list.length; indexIngredientes++) {
        item = "<li>" + list[indexIngredientes] + "</li>"
        lista +=item
         
    }
    return lista
}
function recuperaReceitas(){
    
textoReceitas = ""

fetch('https://prod-110.westus.logic.azure.com/workflows/e50f80756b9b43baa71d055fbee3d9c6/triggers/manual/paths/invoke/tipo/Receitas?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MUPtVkRaZGh1maM7uzFu2cmmaebhC1aKvLcfMfhirw0', options)
    .then(response => {
        response.json()

            .then(data => {
                //console.log(data)
              
                for (index = 0; index < data.value.length; index++) {
                  
                    Ingredientes = titleCase(data.value[index].Ingredientes).split("\n")
                    listaIngredientes = trataListas(Ingredientes)
                                         
                    modoPerparo = titleCase(data.value[index].ModoPreparo).split("\n")
                    listaModos = trataListas(modoPerparo)
                   
                    textoReceitas += "<b>Título: </b>" + titleCase(data.value[index].Titulo) +
                        " <br><b>Ingredientes:</b> <ul>" + listaIngredientes
                        +"</ul><br> <b>Modo de Preparo:</b>"
                        + "<ol>"+listaModos 
                        + "</ol><br> <img height='200px' width='200px' src='" 
                        + data.value[index].Imagem + "'><br>"

                }
                document.getElementById("receita").innerHTML += textoReceitas


            })

    })
    .catch(e => {
        console.log("ERRO: " + e)
    })

}

recuperaCotacoes()
recuperaReceitas()