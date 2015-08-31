//Data Model for the quiz
var quiz = new function(){
	this.allQuestions = [{question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron",
 "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0},
 {question: "Who is buried in Grant's Tomb?", choices: ["George Washington",
 "Ulysses S. Grant", "Thomas Jefferson", "Nobody; it's an above ground mausoleum"], correctAnswer:3}];
 	this.answerSheet = this.allQuestions.map(function(){return -1;});
	var iterator = 0;
	this.getIterator = function(){return iterator;};
	//flag for more questions
	this.moreQuestions = function(){return iterator < this.allQuestions.length;};
	//get the current question
	this.getQuestion = function(){
		var q = this.allQuestions[iterator];
		return {question: q.question, choices: q.choices};
	};
	// answer the question and advance iterator
	this.answerQuestion= function(answer){
		if(iterator < this.allQuestions.length){
			var i = iterator, correctAnswer = this.allQuestions[i].correctAnswer;
			if(answer === correctAnswer){
				this.answerSheet[i] = true;
				console.log("vrai");
			} else if(answer === -1 ){//do nothing

			}else{ 
				this.answerSheet[i] = false;
				console.log("faux");
			}
			iterator += 1;
		}
	};

	//Score the answers to the quiz
	this.scoreQuiz = function(){
		//remove the -1 values
		var sum = this.answerSheet.filter(function(x ){return x !== -1;});
		//get the sum of the correct answers
		var total = sum.reduce(function(x,y){return x + y;});
		//return raw score for the quiz
		return total / this.allQuestions.length;
	}

};
	
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
	drawQuestion(quiz_container.lastChild,quiz.getQuestion());
});

EventUtil.addHandler(next_button,"click",function(event){

			quiz.answerQuestion(getAnswersFromRadioButtons());
			removeQuestion(quiz_container.lastChild);
			if(quiz.getIterator() < quiz.allQuestions.length){
				insertQuestion(quiz_container);
				drawQuestion(quiz_container.lastChild,quiz.getQuestion());
			}else{
				//use removeQuestion function to remove button
				removeQuestion(next_button.parentNode);
				alert(quiz.scoreQuiz());
			}
});