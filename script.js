var playing=false;
var score;
var action;
var timeremaining;
var correctAnswer;

// if we click on start/reset button
document.getElementById("startreset").onclick = function()
{
	// if we are playing
	if(playing==true)
	{
		location.reload(); // reload the page	
	}
	else  // if we are not playing
	{
		playing=true; // change mode to playing

		score=0;  // set score to 0

		document.getElementById("scorevalue").innerHTML=score;

            show("timeremaining"); // show count-down box 

		       timeremaining=60;

		document.getElementById("timeremainingvalue").innerHTML=timeremaining;

		     hide("gameover"); // hide game over box

		document.getElementById("startreset").innerHTML="Reset Game"; // change button to reset

		    // start count-down

			startCountdown();

			// generate new Q&A

			generateQA();
	}	

}

// if we click on answer box  
for(i=1;i<5;i++){
document.getElementById("box"+i).onclick=function()
{
	// check if we are playing
	if(playing==true)
	{
		if(this.innerHTML == correctAnswer)
		{
			// correct answer
			score++; // increase score by 1
			document.getElementById("scorevalue").innerHTML=score;

		  // hide wrong box and show correct box
		  hide("wrong");
		  show("correct");
		  setTimeout(function(){
			  hide("correct");
		  },1000);

		// generate new Q&A

		  generateQA();
		}
		else // wrong answer
		{
		  hide("correct");
		  show("wrong");
		  setTimeout(function(){
			  hide("wrong");
		  },1000);
		}
	}

	}
}


// functions
//start counter		  
function startCountdown()
{
	action=setInterval(function(){
		timeremaining -= 1;
	document.getElementById("timeremainingvalue").innerHTML=timeremaining;
	    if(timeremaining == 0){ // game over
		   stopCountDown();	
		   show("gameover"); 
	document.getElementById("gameover").innerHTML="<p>Game over!</p><p>Your score is " + score + ".</p>"; 
		     hide("timeremaining"); // to disappear time box
			  hide("correct");
			  hide("wrong");
			  playing=false;  
		document.getElementById("startreset").innerHTML="Start Game";	  
		}
	},1000);
}

// stop the counter

function stopCountDown()
{
	 clearInterval(action);
}

// hide certain elements

function hide(Id)
{
	document.getElementById(Id).style.display="none";
}

// show certain elements

function show(Id)
{
	document.getElementById(Id).style.display="block";
}

// generate questions and multiple answers

function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

    //fill other boxes with wrong answers

    var answers = [correctAnswer];

    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}