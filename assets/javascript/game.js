var characters = [{
        id: "1",
        name: "Luke Skywalker",
        healthPoints: "120 HP",
        image: "assets/images/luke-skywalker.jpeg"
    },
    {
        id: "2",
        name: "Darth Maul",
        healthPoints: "",
        image: "assets/images/darth-maul.jpeg"
    },   
    {
        id: "3",
        name: "Obi-Wan Kenobi",
        healthPoints: "",
        image: "assets/images/obi-wan-kenobi.jpeg"
    },
    {
        id: "4",
        name: "Darth Vader",
        healthPoints: "",
        image: "assets/images/darth-vader.jpeg"
}];

var game = {
    selectedCharacter: {},
    defender: {},
    startGame : function() {

        page.showCharacterSelectionSection();

        // delay the loading of audio to give the user time to interact with the DOM
        setTimeout(function(){ 
            game.playAudio("assets/sounds/star-wars-theme.mp3", false)
        }, 2000);
        
    },
    /**
     * @param {String} audioLocation - the location
     * of the mp3 file
     * 
     * Plays a soundbite at the specified location
     */
    playAudio : function(audioLocation, repeat) {
        var audio = new Audio(audioLocation);

        if(repeat){
            audio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }

        audio.play()
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
    fightInformationSection: "#fight-information-section",
    createCharacterCard: function(character, sectionId, childElement) {
        var cardImageElement = $("<img>", {
            "class": "card-img-top img-fluid",
            "src": character.image});

        var cardHeaderElement = $("<div>", {
            "class": "card-header text-center"}).text(character.name);

        var cardTextElement = $("<p>", {
            "class": "card-text"}).text(character.healthPoints);

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
        this.showSection(page.fightInformationSection);
        this.showSection(page.fightSection);
        game.playAudio("assets/sounds/Fight.mp3", false);
    },
    showRemainingEnemiesSection: function(){
        for(index in characters){
            page.createCharacterCard(characters[index], page.remainingEnemiesSection, 3);
        }
        page.showSection(page.remainingEnemiesSection);
    }
};

/************************************* Start Game ***************************************************/

$( document ).ready(function(){

    // whenever the page is loaded, we start a new game
    game.startGame();

    $(page.characterSelection).on("click", ".card", function(){
        var id = $(this).attr("playerId");
        selectedCharacter = game.getCharacter(id);
        game.removeCharacter(id);
        page.hideSection(page.characterSelection);
        page.showEnemySelectionSection();
    });

    $(page.enemySelection).on("click", ".card", function(){
        var defenderId = $(this).attr("playerId");
        defender = game.getCharacter(defenderId);
        game.removeCharacter(defenderId);
        page.hideSection(page.enemySelection);
        page.showFightSection();
        page.showRemainingEnemiesSection();
        page.hideSection(page.starwarsDemoSection);
        $("#main-content").css('top', '0%');
    });
});
/************************************* Start Game ***************************************************/