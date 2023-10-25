let score = 0;
let prev_score;
let chance = 7;

// Array of objects(All the cards)
let cardsArray = [
    {
        name: "bulbasaur",
        img: "https://pnglib.nyc3.cdn.digitaloceanspaces.com/uploads/2020/01/pokemon-bulbasaur_5e0fc45fbe355.png"
    },
    {
        name: "charmander",
        img: "https://clipart.info/images/ccovers/1528080667Charmander-pokemon-transparent.png"
    },
    {
        name: "squirtle",
        img: "https://clipart-library.com/images_k/pokemon-transparent/pokemon-transparent-10.png"
    },
    {
        name: "oddish",
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/043.png",
    },
    {
        name: "blastoise",
        img: "https://i.pinimg.com/originals/55/6a/99/556a990cb624988b65136f083d5ba906.png"
    },
    {
        name: "pikachu",
        img: "https://i.pinimg.com/originals/92/37/6c/92376cd31daa2b778d0c8c972f4ff15e.png"
    },
    {
        name: "rattata",
        img: "https://i.pinimg.com/originals/d5/1b/34/d51b345400c88aeb55fc3e4e186f1d6a.png"
    },
    {
        name: "vulpix",
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/037.png"
    },
    {
        name: "jigglypuff",
        img: "https://i.pinimg.com/originals/78/cd/f0/78cdf0fbd5fff33a76174c8e3da94708.png"
    },
    {
        name: "zubat",
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/041.png",
    },
    {
        name: "diglet",
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/050_f2.png",
    },
    {
        name: "phyduck",
        img: "https://i.pinimg.com/originals/38/c6/e1/38c6e1a50d33f6c0c1e09eced4229b94.png"
    },
];

//Making a new array and copying the images from cardsArray (depends on winning [ex: 6,9,12...])
create(1);
function create(win) {
    let gameCard = [];
    for(let i=0;i<((win*3)+3);i++) {
        gameCard[i]=cardsArray[i];
    }
    gameCard = gameCard.concat(gameCard); //Adds the present images one more time and makes them double

    // Suffling the array to generate images at random position
    function suffle(array) {
        for(let i=array.length-1;i>0;i--) {
            let j = Math.floor(Math.random()*(i+1));
            let temp;
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    let suffledCards = suffle(gameCard);

    // Making card-boxes(Inside the Game container)
    const parentDiv = document.querySelector(".game-container");
    if(win==2) {
        parentDiv.classList.add("grid-1");
        chance = 12;    // 
        document.querySelector(".chance").innerHTML = chance;
    }else if(win>2) {   // To arrange the cards in perfect position for mobile only 
        parentDiv.classList.add("grid-2");
        chance = 15;
        document.querySelector(".chance").innerHTML = chance;
    }

    for(let i=0;i<((win*6)+6);i++) {
        const childDiv = document.createElement("div");     // create divs (12,18....)
        childDiv.classList.add("card");        // Add class name card
        
        var back = document.createElement("div");
        back.classList.add("back-card");

        var front = document.createElement("div");
        front.classList.add("front-card");

        childDiv.dataset.name = suffledCards[i].name;      //Adding different data-name for each card
        front.style.backgroundImage = `url(${suffledCards[i].img})`;

        childDiv.append(back)
        childDiv.append(front)
        parentDiv.append(childDiv);
    }
}

// Click events
let firstcard;
let count;
let secondcard;

clickListener();            // Calling the click event function
function clickListener() {
    let cards = document.querySelectorAll(".card");
    count = 0;
    firstcard = "";
    secondcard = "";
    let j;
    for(let i=0;i<cards.length;i++) {
        cards[i].addEventListener("click", function() {
            count++;
            if(count<3) {       // To match two cards
                if(count == 1) {
                    j = i;
                    firstcard = cards[i].dataset.name;
                    this.classList.add("active");
                }else {
                    secondcard = cards[i].dataset.name;
                    this.classList.add("active");
                    if(j==i) {      //If user clicks on same card
                        reset();
                    }
                    else if(firstcard === secondcard) {
                        match();
                        reset();        //once matched reseting everything to play again
                        checkMatch();   //checking if all cards are matched
                    }else {
                        if(count==2) {
                            chance--;
                            if(chance == 0) {
                                gameover();  // Reseting the game if all chances are over
                            }
                            document.querySelector(".chance").innerHTML = chance;
                            setTimeout(function() {
                                reset();     //else also reseting everything to play again
                            }, 700)
                        }
                    }
                }
            }
        });
    }
}

function match() {
    score++;
    document.querySelector(".score").innerHTML = score;
    let selectedCards = document.querySelectorAll(".active");
    selectedCards.forEach(function(elem) {   
        elem.classList.add("match");     //Adding a class whenver card matches 
    })
    new Audio("sounds/matched.mp3").play();
}
function reset() {      
    count = 0;
    firstcard = "";
    secondcard = "";
    let selectedCards = document.querySelectorAll(".active");   //Removing the active class to rotate back
    selectedCards.forEach(function(elem) {
        elem.classList.remove("active");      
    })
}
// Adding more cards after a win (reseting the game)
let win = 1;
function checkMatch() {
    const allCards = document.querySelectorAll(".card");
    const matchedCards = document.querySelectorAll(".match");
    if(allCards.length === matchedCards.length) {
        setTimeout(function() {
            matchedCards.forEach(function(elem) {
                elem.remove();
            });
            win++;
            if(win>3) {
                win=3;
            }
            create(win);    // Adding cards
            count = 0;
            prev_score = score;
            clickListener();      // Adding click function to new cards
        },1000)
    }
}
function gameover() {
    count = 0;
    firstcard = "";
    secondcard = "";
    let selectedCards = document.querySelectorAll(".active");   //Removing the active class to rotate back
    selectedCards.forEach(function(elem) {
        elem.classList.remove("active");      
    })
    const matchedCards = document.querySelectorAll(".match");
    matchedCards.forEach(function(elem) {
        elem.classList.remove("match");
    });

    let best_score = score;     // Displaying the best score
    document.querySelector(".best-score-div").style.display = "block";
    document.querySelector(".best-score").innerHTML = `${best_score}`;
    
    if(win==1) {        // Reseting the chances and score whenver the game is over
        chance = 3;  
        score = 0;   
    }else if(win==2) {
        chance = 7;
        score = prev_score;
        document.querySelector(".score").innerHTML = score;
    }else if(win>2) {
        chance = 10;
        score = prev_score;
        document.querySelector(".score").innerHTML = score;
    }
}