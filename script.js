// ---------------------------------------------------------
// 1. Variáveis globais
// ---------------------------------------------------------

// Procura pelo campo de "CEP" no documento HTML.
const txt_cep = document.querySelector("#cep");

// Procura pelo campo de "Rua" no documento HTML.
const txt_rua = document.querySelector("#rua");

// Procura pelo campo de "Número" no documento HTML.
const txt_num = document.querySelector("#numero");

// Procura pelo campo de "Cidade" no documento HTML.
const txt_cidade = document.querySelector("#cidade");

// Procura pelo campo de "Bairro" no documento HTML.
const txt_bairro = document.querySelector("#bairro");

// Porcura pelo elemento spinner 'Carregando' no documento HTML.
const loadingOverlay = document.querySelector("#loadingOverlay");

// ---------------------------------------------------------
// 2. Funções de Lógica
// ---------------------------------------------------------

function consultaCEP() {
    // Lê o CEP digitado no campo "CEP" da página HTML para a cariável 'cep'.
    let cep = txt_cep.value;

    // Verifica se o CEP é correspondente ao padrão '00000-000', ou seja, se é um CEP válido.
    if (cep.match(/^\d{5}-\d{3}$/)) {
        // Uma API permite que a gente obtenha informações sem sair da página atual.
        // Nosso objetivo é obter as informações do CEP digitado.
        // A URL da API de CEP possui o seguinte formato:
        // https://viacep.com.br/ws/12345123/json/, onde "12345123" é o CEP(sem traço, apenas números).

        // Remove o "-" da várialvel 'cep'.
        cep = cep.replace("-", "");

        // Exibe o spinner de 'Carregando'.
        loadingOverlay.classList.add('d-flex');
        loadingOverlay.classList.remove('d-none');

        fetch('https://viacep.com.br/ws/'+cep+'/json/')
        .then(function(response) {
            // Oculta o spinner de 'Carregando' ao receber a resposta da API.
            loadingOverlay.classList.add('d-none');
            loadingOverlay.classList.remove('d-flex');

            // Converte a resposta para JSON.
            return response.json();
        })
        .then(function(jsonResponse) {
            // Exibe a resposta convertida da API na Console do navegador Web.
            console.log(jsonResponse);

            // A API da ViaCEP retorna a chabe 'erro' quando o CEP digitado é inválido.
            if (jsonResponse.erro) {
                console.log("CEP inválido!");
                
                // Exibe a mensagem "CEP inválido!" abaixo do campo de CEP.
                txt_cep.classList.add("is-invalid");
            } else {
                // Remove a mensagem "CEP inválido!" abaixo do campo de CEP (se existir).
                txt_cep.classList.remove("is-invalid");

                // Preenche os campos de texto com as informações retornadas pela API.
                txt_rua.value = jsonResponse.logradouro;
                txt_cidade.value = jsonResponse.localidade;
                txt_bairro.value = jsonResponse.bairro;
            }
        });

    }
}

// ---------------------------------------------------------
// 3. Estruturas de eventos e início
// ---------------------------------------------------------

// Exdecuta a função ao digitar qualquer tecla no campo "CEP"
txt_cep.addEventListener("keyup", consultaCEP);

// Adiciona máscara ao campo de CEP
jQuery(function($) {
    $("#cep").mask("99999-999");
});