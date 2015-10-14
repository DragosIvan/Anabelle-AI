// node-soap functionality ***********************
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

var fs = require('fs');
var mysql = require('mysql');

AIMLInterpreter = require('../node_modules/aimlinterpreter');
var aimlInterpreter = new AIMLInterpreter();
aimlInterpreter.loadAIMLFilesIntoArray(['./app/database.aiml.xml']);

aimlInterpreter.findAnswerInLoadedAIMLFiles("SETOLDUSER null", function(answer, wildCardArray, input) {
	console.log(answer);
})

// expose the routes to our app with module.exports
module.exports = function(app) {

  app.post('/api/anabelle', function(req, res) {
    
    console.log(req.body.message);

    var i = req.body.gatheringData;

    if (i == 0) // Insert name into database if not exist
    // If exist, set i to 3
	// If not exist, set i to i++ and send it back to the front-end

	var jsonMessage = {
		gatheringData: i,
		message: ''
	}



	aimlInterpreter.findAnswerInLoadedAIMLFiles(req.body.message, function(answer, wildCardArray, input) {
		
		console.log(answer);

		res.json({
			message: answer,
			wildCards: wildCardArray,
			input: input
		});
	})

    
  });
          
  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};




