$(document).ready(()=>{
    var cardsPairsCount = 0;
    var playerIndexRound = 0;
    var playersScore = [0,0];

    const fxs = {
        ["2x + 3"]: "2, 7",
        ["3x + 1"]: "1, 4",
        ["7x"]: "4, 28",
        ["x/2"]: "8, 4",
        ["x + 4"]: "5, 9",
        ["x - 5"]: "10, 5",
        ["6x - 10"]: "10, 50",
        ["10x"]: "10, 100",
        ["x/3 + 5"]: "9, 8",
        ["4x + 3"]: "3, 15"
    };

    function resetValues(){
        $('.gamecard').remove();
        playersScore = Array.from(playersScore, c=>0);
        playerIndexRound = 0;
        updatePlayersScore();
    }

    function checkWin(){
        if((playersScore[0]+playersScore[1])===parseInt(cardsPairsCount)){
            $('#win-message').removeClass('d-none');
            if(playersScore[0] === playersScore[1])
                $('#winner-player')[0].innerHTML = '1 e 2';
            else
                $('#winner-player')[0].innerHTML = playersScore[0] > playersScore[1] ? '1' : '2';
        }
    }
    
    function changePlayerRound(){
        playerIndexRound = (playerIndexRound+1)%playersScore.length;
        $('#player-rounde-index')[0].innerHTML = playerIndexRound+1;
    }

    function updatePlayersScore(){
        $('#gamescore-player-1')[0].innerHTML = playersScore[0];
        $('#gamescore-player-2')[0].innerHTML = playersScore[1];
    }

    function getShowedCards(){
        var cards = $('.gamecard-show');
        cards = cards.filter(c=> !cards[c].classList.contains('gamecard-win'));
        return cards;
    }

    function getShowedCardsCount(){
        return getShowedCards().length;
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

    function createCards(){
        var newCards = [];
        for(var fx in fxs) {
            if((newCards.length/2) != cardsPairsCount){
                newCards.push(`<div class="gamecard"><b class="content">${fx}</b></div>`);
                newCards.push(`<div class="gamecard"><b class="content">${fxs[fx]}</b></div>`);
            }
        };

        newCards = shuffle(newCards);
        for(var card in newCards){
            $('#gameboard-cards-div').append(newCards[card]);
        }
        $('.gamecard').click(cardClick);
        $('#win-message').addClass('d-none');
        
        setTimeout(()=>{
            $('.gamecard').addClass('gamecard-hide');
        }, 5000);
    }

    function newGame(){
        cardsPairsCount = prompt('Digite um número de pares de cartas entre 3 e 7');
        if( cardsPairsCount == null || 
            cardsPairsCount == undefined || 
            !parseInt(cardsPairsCount) || 
            !(cardsPairsCount>=3 && cardsPairsCount<=7))
        {   
            alert('Por favor, preencha um valor correto!')
            newGame();
            return;
        }

        resetValues();
        createCards();
    }

    function cardClick(){
        var el = $(this);
        if(el.hasClass('gamecard-show') || getShowedCardsCount() >= 2) return;
        el.toggleClass('gamecard-hide');
        el.toggleClass('gamecard-show');
        
        new Promise(p=>setTimeout(p,2000)).then(()=>{
            if(getShowedCardsCount() == 2){
                var cardsShowed = getShowedCards();
                var cardsContent = Array.from(cardsShowed, c=> c.childNodes[0].innerHTML);
                var txt0 = cardsContent[0], txt1 = cardsContent[1];
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

                updatePlayersScore();
                changePlayerRound();
                checkWin();
            }
        });
    }

    function createEvents(){
        $('.btn-start-new-game').click(newGame);
        $('.gamecard').click(cardClick);
    }

    function init(){
        createEvents();
        newGame();
    }

    init();
});