

var buttonColours = ["red", "blue", "green", "yellow"];

var userClikedPattern = [];
var gamePattern = [];


var started = false;
var level = 0;


$(".btn").click(function(){
    var userChosenColor = (this.id);
    userClikedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClikedPattern.length-1);
});

$(document).keydown(function(event){
   
    if (!started) {     
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function checkAnswer(currentLevel){
    if(userClikedPattern[currentLevel]  === gamePattern[currentLevel]){   
        console.log("success");
            if(userClikedPattern.length  === gamePattern.length) {
                setTimeout(function() { nextSequence(); }, 1000);
                
            }
    }else{
        var wrong = "wrong";
        playSound(wrong);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern  = [];
    started = false;
    
}

function nextSequence(){

    userClikedPattern =[];
    level++;
    $("#level-title").text("Level " + level);

    var numbers = [0,1,2,3];
    var randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    var activeButton = $("."+ currentColour);
    activeButton.addClass("pressed");
    setTimeout(function(){
        activeButton.removeClass("pressed");
    }, 100);
};


