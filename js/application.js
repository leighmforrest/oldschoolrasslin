//Global variables
//quiz_container-> contains the quiz element.
//next_button-> contains the button
var quiz_container = document.getElementById('quiz_container');
var next_button = document.getElementById("next");


//Replace old 'quiz' element and replace it with an empty one
//quiz_container is presumed to exist.
function replaceQuestion(){
	var newEl = document.createElement("div");
	newEl.setAttribute('id','quiz');
	quiz_container.replaceChild(newEl,quiz_container.lastChild);
}
//Draws a quesion onto a div
//quiz: div element containing the question
//question: an object with a question
function drawQuestion(quiz,question){
	var frag= document.createDocumentFragment();
	//draw the question
	var questionTag = document.createElement("p");
	var questionText = document.createTextNode(question.question);
	questionTag.appendChild(questionText);
	frag.appendChild(questionTag);
	//draw the radio buttons
	question.choices.forEach(function(val,i){
		var answerSel = document.createElement("input");
		answerSel.setAttribute('type', 'radio');
		answerSel.setAttribute('name', 'answer');
		answerSel.setAttribute('value', val);
		//add the label
		var label= document.createElement("label");
		label.innerHTML = val;
		frag.appendChild(answerSel);
		frag.appendChild(label);
		frag.appendChild(document.createElement("br"));
	});
	//append the fragment to the child
	quiz.appendChild(frag);
}

//Get the value of the radio button group
function getAnswersFromRadioButtons(){
	var radio = document.getElementsByName('answer');
	for(var i = 0; i < radio.length; i++){ 
		if(radio[i].checked == true) return i; 
		else continue;
	}
	return -1;
}

/*
Here are the event listeners
onload->load the first question
onclick->if iterator less than questions, replace the old question with the new
	else, display the score
*/

EventUtil.addHandler(window,"load",function(event){
	
	replaceQuestion();
	drawQuestion(quiz_container.firstChild,quiz.getQuestion());
});

EventUtil.addHandler(next_button,"click",function(event){

			quiz.answerQuestion(getAnswersFromRadioButtons());
			replaceQuestion();
			if(quiz.getIterator() < quiz.allQuestions.length){
				drawQuestion(quiz_container.lastChild,quiz.getQuestion());
			}else{
				//score the quiz
				var score = quiz.scoreQuiz();
				//use replacequestion
				replaceQuestion(next_button.parentNode);
				//insert paragraph to display score
				var scoreDisp = document.createElement("p");
				var scoreDispTxt = document.createTextNode("Your score is " + score);
				scoreDisp.appendChild(scoreDispTxt);
				quiz_container.lastChild.appendChild(scoreDisp);
			}
});