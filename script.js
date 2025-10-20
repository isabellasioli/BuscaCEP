// ---------------------------------------------------------
// 1. Variáveis globais
// ---------------------------------------------------------

const txt_cep = document.querySelector('#cep');

// ---------------------------------------------------------
// 2. Funções de Lógica
// ---------------------------------------------------------

function consultaCEP() {
    alert("Olá mundo!");
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