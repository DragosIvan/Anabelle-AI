// node-soap functionality ***********************
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var fs = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  database : 'anabelle',
  user     : 'root'
});

var user_name = '';
var user_age = '';
var user_ocupation = '';

AIMLInterpreter = require('../node_modules/aimlinterpreter');
var aimlInterpreter = new AIMLInterpreter();
aimlInterpreter.loadAIMLFilesIntoArray(['./app/database.aiml.xml']);

// expose the routes to our app with module.exports
module.exports = function(app) {

  app.post('/api/anabelle', function(req, res) {
  	var queryStringInsert = 'INSERT INTO user SET ?';
  	var queryStringUsername = 'SELECT * FROM user WHERE user_name = ? ';
    var i = req.body.gatheringData;

	var jsonMessage = {
		gatheringData: i,
		message: ''
	}

	aimlInterpreter.findAnswerInLoadedAIMLFiles(req.body.message, function(answer, wildCardArray, input) {

	    if (i == 0) { 
	    	connection.query(queryStringUsername, wildCardArray[0], function(err, rows, fields) {
	    		if(err) throw err;

	    		console.log(rows[0]);

	    		if(rows[0] != undefined ) {
	    			user_name = rows[0].user_name;
	    			user_age = rows[0].user_age;
	    			user_ocupation = rows[0].user_ocupation;

	    			jsonMessage.gatheringData = 3;
	    			aimlInterpreter = new AIMLInterpreter();
	    			aimlInterpreter.loadAIMLFilesIntoArray(['./app/database-' + rows[0].user_ocupation + '.aiml.xml']);
	    			setTimeout(function() {
	    				aimlInterpreter.findAnswerInLoadedAIMLFiles("SETNAME " + rows[0].user_name, function(answer, wildCardArray, input) {
	    					aimlInterpreter.findAnswerInLoadedAIMLFiles("SETAGE " + rows[0].user_age, function(answer, wildCardArray, input) {
	    						aimlInterpreter.findAnswerInLoadedAIMLFiles("SETOCUPATION " + rows[0].user_ocupation, function(answer, wildCardArray, input) {
	    							jsonMessage.message = answer.toLowerCase().charAt(0).toUpperCase() + answer.toLowerCase().slice(1);
	    							res.json(jsonMessage); 
	    						})		
	    					})
	    				})
	    			}, 3000);  					
	    		} else {
					user_name = wildCardArray;
		    		jsonMessage.gatheringData = parseInt(i) + 1;
		    		jsonMessage.message = answer.toLowerCase().charAt(0).toUpperCase() + answer.toLowerCase().slice(1);
		    		res.json(jsonMessage);					
	    		}
	    	});
		} 

		if (i == 1) {
			user_age = wildCardArray;
			jsonMessage.gatheringData = parseInt(i) + 1;
			jsonMessage.message = answer.toLowerCase().charAt(0).toUpperCase() + answer.toLowerCase().slice(1);
	    	res.json(jsonMessage);
		}

		if (i == 2) {
			user_ocupation = wildCardArray;
			jsonMessage.gatheringData = parseInt(i) + 1;
			

			var temp = {
				user_name: user_name,
				user_age: user_age,
				user_ocupation: user_ocupation
			};

			connection.query(queryStringInsert, temp, function(err, fields) {
				if(err) throw err;
			});

			aimlInterpreter = new AIMLInterpreter();
			aimlInterpreter.loadAIMLFilesIntoArray(['./app/database-' + temp.user_ocupation + '.aiml.xml']);
			setTimeout(function() {
				aimlInterpreter.findAnswerInLoadedAIMLFiles("SETNAME " + temp.user_name, function(answer, wildCardArray, input) {
					aimlInterpreter.findAnswerInLoadedAIMLFiles("SETAGE " + temp.user_age, function(answer, wildCardArray, input) {
						aimlInterpreter.findAnswerInLoadedAIMLFiles("SETOCUPATION " + temp.user_ocupation, function(answer, wildCardArray, input) {
							jsonMessage.message = answer.toLowerCase().charAt(0).toUpperCase() + answer.toLowerCase().slice(1);
							res.json(jsonMessage); 
						})		
					})
				})
			}, 3000);
		}

		if (i == 3) {
			aimlInterpreter.findAnswerInLoadedAIMLFiles(req.body.message, function(answer, wildCardArray, input) {
				jsonMessage.message = answer.toLowerCase().charAt(0).toUpperCase() + answer.toLowerCase().slice(1);
				res.json(jsonMessage);
			});
		}
	});
});
          
  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
