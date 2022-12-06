$(document).ready(()=>{

    var playerIndexRound = 0;
    var playersScore = [0,0];

    const fxs = {
        ["2x + 3"]: "2, 7",
        ["3x + 1"]: "1, 4",
        ["4x"]: "4, 16",
        ["x/2"]: "8, 4",
        ["x + 4"]: "5, 9",
        ["x - 5"]: "10, 5",
        ["6x - 10"]: "10, 50",
        ["10x"]: "10, 100",
        ["x/3 + 5"]: "9, 8",
        ["4x + 3"]: "3, 15"
    };
    
    function updatePlayersScore(){
        $('#gamescore-player-1').innerHTML = playersScore[0];
        $('#gamescore-player-2').innerHTML = playersScore[1];
    }

    function getShowedCardsCount(){
        var cards = $('.gamecard-show');
        cards = cards.filter(c=> !cards[c].classList.contains('gamecard-win'));
        return cards.length;
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
        
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function newGame(){
        var cardsNumber = prompt('Digite um número de pares de cartas entre 2 e 7');
        if(cardsNumber == null) return;2
        if(!parseInt(cardsNumber) || !(cardsNumber>=2 && cardsNumber<=7))
        {   
            alert('Por favor, preencha um valor correto!')
            return;
        }
        console.log(`Gerando jogo com ${cardsNumber} pares de cartas..`);   
        $('.gamecard').remove();

        var newCards = [];
        for(var fx in fxs) {
            if((newCards.length/2) != cardsNumber){
                newCards.push(`<div class="gamecard gamecard-hide"><b class="content">${fx}</b></div>`);
                newCards.push(`<div class="gamecard gamecard-hide"><b class="content">${fxs[fx]}</b></div>`);
            }
        };

        newCards = shuffle(newCards);
        for(var card in newCards){
            $('#gameboard-cards-div').append(newCards[card]);
        }
        $('.gamecard').click(cardClick);
    }

    function cardClick(){
        var el = $(this);
        if(el.hasClass('gamecard-show') || getShowedCardsCount() >= 2) return;
        el.toggleClass('gamecard-hide');
        el.toggleClass('gamecard-show');
        
        new Promise(p=>setTimeout(p,2000)).then(()=>{
            if(getShowedCardsCount() == 2){
                var cardsContent = $('.gamecard-show .content');
                cardsContent = cardsContent.filter(c=>!cardsContent[c].classList.contains('gamecard-win'));
                var txt0 = cardsContent[0].innerHTML;
                var txt1 = cardsContent[1].innerHTML;
                var key = (fxs[txt0] !== undefined) ? txt0 : ((fxs[txt1] !== undefined) ? txt1 : undefined);
                var val = (fxs[txt0] !== undefined) ? txt1 : ((fxs[txt1] !== undefined) ? txt0 : undefined);
                
                if(key !== undefined && fxs[key] == val){
                    playersScore[playerIndexRound]++;
                    $('.gamecard-show').addClass('gamecard-win');
                }

                var allCards = $('.gamecard');
                allCards.each(index=>{
                    var item = allCards[index];
                    if(item.classList.contains('gamecard-show') && !item.classList.contains('gamecard-win'))
                    {
                        item.classList.toggle('gamecard-hide');
                        item.classList.toggle('gamecard-show');
                    }
                });
            }

            playerIndexRound = (playerIndexRound+1)%playersScore.length;
            $('#player-rounde-index').innerHTML = playerIndexRound+1;
            updatePlayersScore();
        });
    }

    function createEvents(){
        $('#btn-start-new-game').click(newGame);
        $('.gamecard').click(cardClick);
    }

    function init(){
        createEvents();
        newGame();2
    }

    init();
});