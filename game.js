var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

function nextSequence(){
    userClickedPattern = [];
    // Choosing an random number betwwen 0-3
    var numberChoosen = Math.random();
    numberChoosen = Math.floor(numberChoosen*4);
    // Choosing random number
    var randomChosenColour = buttonColours[numberChoosen];
    //Adding that random number into pattern
    gamePattern.push(randomChosenColour);
    // Animating that so it fadeIn then out then in
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    //Increasing one level
    level++;
    $("#level-title").text("Level " + level);


}    

// For user clicking the button it shoud be able to get its value
$(".btn").click(function(event){
    // Getting the id of the container user has clicked
    var userChoosenColour = event.target.id;
    // Adding it to the array
    userClickedPattern.push(userChoosenColour);

    playSound(userChoosenColour);

    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length-1);
})

// Playing sounds
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//Adding animation for user selecting mouseCLick
function animatePress(currentColour){
    var selector = $("#"+currentColour);
    selector.addClass("pressed");
    setTimeout(function() { 
    selector.removeClass("pressed")},100);
}

//For Staring the game
var started = false;


$(document).keydown(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
})


// For user value to start the game and checking
function checkAnswer(currentLevel){

        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);}
        }    
        else{
            playSound("wrong");
            $(document).addClass("game-over");
            setTimeout(function() 
            { $(document).removeClass("game-over")},200);
            $("h1").text("Game Over, Press Any Key To Restart");
            startOver();
        } 
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}