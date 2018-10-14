var characters = [{
        id: "1",
        name: "Yoda",
        healthPoints: 120,
        attackPower: 8,
        counterAttackPower: 15,
        image: "assets/images/yoda.jpeg"
    },
    {
        id: "2",
        name: "Darth Maul",
        healthPoints: 100 ,
        attackPower: 12,
        counterAttackPower: 5,
        image: "assets/images/darth-maul.jpeg"
    },   
    {
        id: "3",
        name: "Obi-Wan Kenobi",
        healthPoints: 150,
        attackPower: 8,
        counterAttackPower: 20,
        image: "assets/images/obi-wan-kenobi.jpeg"
    },
    {
        id: "4",
        name: "Darth Vader",
        healthPoints: 185,
        attackPower: 7,
        counterAttackPower: 25,
        image: "assets/images/darth-vader.jpeg"
}];

var game = {
    numberOfBattles: 0,
    selectedCharacter: {},
    defender: {},
    startGame : function() {

        page.showCharacterSelectionSection();

        // delay the loading of audio to give the user time to interact with the DOM
        game.playAudio("assets/sounds/star-wars-theme.mp3", true, 2000)
        
    },
    /**
     * @param {String} audioLocation - the location
     * of the mp3 file
     * 
     * Plays a soundbite at the specified location
     */
    playAudio : function(audioLocation, repeat, delay) {

        var audio = new Audio(audioLocation);

        setTimeout(function(){ 
            if(repeat){
                audio.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }

            audio.play()
    
        }, delay);
    },
    removeCharacter: function(selectedCharacterId){
        for(var index in characters){
            var currentCharacter = characters[index];
            if(selectedCharacterId === currentCharacter.id){
                characters.splice(index, 1);
            }
        }
    },
    getCharacter: function(selectedCharacterId){
        var character;

        for(var index in characters){
            var currentCharacter = characters[index];
            if(selectedCharacterId === currentCharacter.id){
                character = characters[index];
            }
        }

        return character;
    },
    attack: function(originalAttackPower){
        // increment the attack power by the existing attack power
        // + the original attack power
        selectedCharacter.attackPower += originalAttackPower;
        // decrement enemies health points by the attack power
        defender.healthPoints -= selectedCharacter.attackPower;

        var defenderCounterAttackPower;

        // only allow a counter attack if the enemy still has health remaining
        if(defender.healthPoints > 0){
            defenderCounterAttackPower = defender.counterAttackPower;
            // decrement selectedCharacter's health points by the enemies counter attack power
            selectedCharacter.healthPoints -= defenderCounterAttackPower;
        }

        //update the fight information section with the latest attack info
        page.updateFightSection(selectedCharacter.attackPower, defenderCounterAttackPower);
    }, 
    isWinner: function(){
        var isWinner = false;
        if(characters.length === 0){
            game.playAudio("assets/sounds/flawless-victory.mp3", false, 1000);
            isWinner = true;
        }
        return isWinner;
    }
};

var page = {
    characterSelection: "#character-selection",
    enemySelection: "#enemy-selection",
    fightSection: "#fight-section",
    remainingEnemiesSection: "#remaining-enemies-section",
    starwarsDemoSection: "#starwars-demo",
    selectedCharacterSection: "#selected-character",
    defenderSection: "#defender",

    /**
     * Creates the character cards used in the various sections of the game
     */
    createCharacterCard: function(character, sectionId, childElement) {
        var cardImageElement = $("<img>", {
            "class": "card-img-top img-fluid",
            "src": character.image});

        var cardHeaderElement = $("<div>", {
            "class": "card-header text-center"}).text(character.name);

        var cardTextElement = $("<p>", {
            "class": "card-text"}).text(character.healthPoints + " HP");

        var cardBodyElement = $("<div>", {
            "class": "card-body text-dark text-center"}).append(cardTextElement);

        var cardElement = $("<div>", {
            "class": "card border-warning mb-3 mt-3 p-0",
            "playerId": character.id});
        
        cardElement.append(cardHeaderElement);
        cardElement.append(cardImageElement);
        cardElement.append(cardBodyElement);
        
        $(sectionId + ">div:nth-child(" + childElement + ")").append(cardElement);
    },
    showSection: function(sectionId){
        $(sectionId).fadeIn(3000);

    },
    hideSection: function(sectionId){
        $(sectionId).hide();
    },
    renderFightSection: function(){
        page.createCharacterCard(defender, page.fightSection, 4);
        this.showSection(page.fightSection);
        var battleAreaTextElement = $("#battle-area").find("span");
        battleAreaTextElement.text("CLICK ON ENEMY TO ATTACK");
        var fightInformationTextElement = $("#fight-information-section").find("p").text("");
        game.playAudio("assets/sounds/Round " + game.numberOfBattles + ".mp3", false, 0);
        game.playAudio("assets/sounds/Fight.mp3", false, 1500);
    },
    showCharacterSelectionSection: function(){
        for(index in characters){
            page.createCharacterCard(characters[index], page.characterSelection, 2);
        }

        page.showSection(page.characterSelection);
    },
    showEnemySelectionSection: function(){
        for(index in characters){
            page.createCharacterCard(characters[index], page.enemySelection, 2);
        }
        page.showSection(page.enemySelection);
        game.playAudio("assets/sounds/choose-your-destiny.mp4", false);
    },
    showFightSection: function(){
        page.createCharacterCard(selectedCharacter, page.fightSection, 2);
        page.createCharacterCard(defender, page.fightSection, 4);
        this.showSection(page.fightSection);
        game.playAudio("assets/sounds/Round " + game.numberOfBattles + ".mp3", false, 0);
        game.playAudio("assets/sounds/Fight.mp3", false, 1500);
    },
    showRemainingEnemiesSection: function(){
        for(index in characters){
            page.createCharacterCard(characters[index], page.remainingEnemiesSection, 3);
        }
        page.showSection(page.remainingEnemiesSection);

    },
    /**
     * This function is called everytime an attack takes place. It updates the screen with the
     * latest information and enables/diables features depending on the outcome of the attack
     * (i.e. win, loss, etc.)
     * 
     * TODO: This needs to be refactored and made more modular. Too much is taking place
     * in this function.
     */
    updateFightSection: function(enemeyDamagePoints, characterDamagePoints) {

        var selectedCharacterHealthPoints = selectedCharacter.healthPoints;
        var enemyHealthPoints = defender.healthPoints;

        var selectedCharacterHealthTextElement = $("#selected-character").find("p");
        selectedCharacterHealthTextElement.html(selectedCharacterHealthPoints + " HP");

        var defenderHealthTextElement = $("#defender").find("p");
        defenderHealthTextElement.html(enemyHealthPoints + " HP");

        var battleAreaTextElement = $("#battle-area").find("span");

        var attackResult;

        // lose game
        if(selectedCharacterHealthPoints <= 0) {
            game.playAudio("assets/sounds/long-laugh.mp3", false, 0);
            var selectedCharacterImageElement = $("#selected-character").find(':first-child').find("img");
            selectedCharacterImageElement.attr("src", "assets/images/game_over.jpg")
            $(page.defenderSection).off('click');
            var battleAreaTextElement = $("#battle-area").find("span");
            battleAreaTextElement.text("RELOAD PAGE TO START OVER");

            attackResults = "“Do. Or do not. There is no try.” — Yoda"
        }
        // defeated enemy
        else if(enemyHealthPoints <= 0) {

            game.removeCharacter(defender.id);
            $("#defender").find(':first-child').detach();

            // beat game
            if(game.isWinner()) {
                attackResults = "“The Force will be with you. Always.” — Obi-Wan Kenobi";
                battleAreaTextElement.text("YOU WIN! CONGRATULATIONS!");
            }
            else{
                game.playAudio("assets/sounds/Outstanding.mp3", false, 0);
                attackResults = "You have defeated " + defender.name + ", you can choose to fight " +
                "another enemy."
    
                battleAreaTextElement.text("CHOOSE NEW ENEMY FROM REMAINING ENEMIES SECTION");
            }

            // an enemy was just defeated so we need to allow them to choose another enemy
            $(page.remainingEnemiesSection).on("click", ".card", function(){
                game.numberOfBattles++;
                var defenderId = $(this).attr("playerId");
                defender = game.getCharacter(defenderId);
                $(this).detach();
                page.renderFightSection();
                $(page.remainingEnemiesSection).off('click');
            });
        }
        //attack enemy
        else {
            game.playAudio("assets/sounds/light-saber.mp3", false, 0);

            if (enemyHealthPoints <= 50) {
                game.playAudio("assets/sounds/finish-him.mp3", false, 0);
            }
            attackResults = "You attacked " + defender.name + " and took away " + enemeyDamagePoints 
            + " health points. \n" + defender.name + " counter-attacked and took away " + characterDamagePoints
            + " health points.";
        }

        // update screen based on results above
        var fightInformationTextElement = $("#fight-information-section").find("p");

        fightInformationTextElement.animate({opacity:0}).queue(function(){
            $(this).text(attackResults).dequeue()}).animate({opacity:1});  
    }
};

/************************************* Start Game ***************************************************/

$( document ).ready(function(){

    // whenever the page is loaded, we start a new game
    game.startGame();
    var originalAttackPower;

    $(page.characterSelection).on("click", ".card", function(){
        var id = $(this).attr("playerId");
        selectedCharacter = game.getCharacter(id);
        originalAttackPower = selectedCharacter.attackPower;
        game.removeCharacter(id);
        page.hideSection(page.characterSelection);
        page.showEnemySelectionSection();
    });

    $(page.enemySelection).on("click", ".card", function(){
        var defenderId = $(this).attr("playerId");
        defender = game.getCharacter(defenderId);
        game.numberOfBattles++;
        game.removeCharacter(defenderId);
        page.hideSection(page.enemySelection);
        page.showFightSection();
        page.showRemainingEnemiesSection();
        page.hideSection(page.starwarsDemoSection);
        $("#main-content").css('top', '5%');
    });
    $(page.defenderSection).on("click", ".card", function(){
        game.attack(originalAttackPower);
    });
});
/************************************* Start Game ***************************************************/