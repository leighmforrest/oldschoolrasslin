var quiz_container = document.getElementById('quiz_container');
var next_button = document.getElementById("next");
//Remove the quiz from the quiz_container
//quiz: Reference to the node containing the question
function removeQuestion(quiz){
	var removeEl = quiz;
	var parentEl = removeEl.parentNode;
	parentEl.removeChild(removeEl);
}
//inserts new question div in quiz_container
function insertQuestion(quiz){
	var newEl = document.createElement("div");
	newEl.setAttribute('id','quiz');
	quiz.appendChild(newEl);
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
	insertQuestion(quiz_container);
	drawQuestion(quiz_container.lastChild,Quiz.getQuestion());
});

//The next_button event handler
EventUtil.addHandler(next_button,"click",function(event){

			Quiz.answerQuestion(getAnswersFromRadioButtons());
			removeQuestion(quiz_container.lastChild);
			insertQuestion(quiz_container);
			if(Quiz.getIterator() < Quiz.allQuestions.length){
				drawQuestion(quiz_container.lastChild,Quiz.getQuestion());
			}else{
				//score the quiz
				var score = Quiz.scoreQuiz();
				//use removeQuestion function to remove button
				removeQuestion(next_button.parentNode);
				//insert paragraph to display score
				var scoreDisp = document.createElement("p");
				var scoreDispTxt = document.createTextNode("Your score is " + score);
				scoreDisp.appendChild(scoreDispTxt);
				quiz_container.lastChild.appendChild(scoreDisp);
			}
});