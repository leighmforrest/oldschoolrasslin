//Data Model for the quiz
var Quiz = new function(){
	this.allQuestions = [{question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron",
 "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0},
 {question: "Who is buried in Grant's Tomb?", choices: ["George Washington",
 "Ulysses S. Grant", "Thomas Jefferson", "Nobody; it's an above ground mausoleum"], correctAnswer:3},
 {question: "Is this quiz bogus?", choices: ["true",
 "false"], correctAnswer:1}];
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
			} else if(answer === -1 ){//do nothing

			}else{ 
				this.answerSheet[i] = false;
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
		return (100 * (total / this.allQuestions.length)).toFixed(2);
	}

};	//end Quiz data object