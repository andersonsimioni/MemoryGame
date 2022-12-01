$(document).ready(()=>{

    function newGame(){
        var cardsNumber = prompt('Digite um número de pares de cartas entre 4 e 7');
        if(!parseInt(cardsNumber) || !(cardsNumber>=4 && cardsNumber<=7))
        {   
            alert('Por favor, preencha um valor correto!')
            return;
        }
        console.log(`Gerando jogo com ${cardsNumber} pares de cartas..`);

        
    }

    function createEvents(){
        $('#btn-start-new-game').click(newGame);
    }

    function init(){
        createEvents();
    }

    init();
});