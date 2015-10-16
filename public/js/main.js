$(document).ready(function() {

	setTimeout(function() {
		$('#cube-wrapper').css({
			'opacity': 1,
			'-webkit-transform': 'scale(1)'
		});
	}, 100);

	setTimeout(function() {
		greenTop();
	}, 1250);

	setTimeout(function() {
		greenTop();
		$('.anabelle-message').css({
			'opacity': 1,
			'top': 150
		});
		$('.anabelle-input').css('opacity', 1);
	}, 1300);

	var i = 0;
	var timeoutVal = 1500;

	document.addEventListener('keyup', function(e)
    {
		switch(e.keyCode)
		{
	        case 13:
	        	repeatRedAround();
	        	var data = {
	        		message: $('.anabelle-input').val(),
	        		gatheringData: i
	        	}

	        	if (data.message.indexOf('work') > -1 || data.message.indexOf('faculty') > -1) timeoutVal = 0;
	        	else timeoutVal = 1500;

	        	$('.anabelle-input').val('');

	        	setTimeout(function() {
	        		$.ajax({
		        		method: "POST",
		        		url: '/api/anabelle',
		        		data: data,
		        		success: function(response) {
		        			i = response.gatheringData;
		        			$('.anabelle-message').css('opacity', 0);
		        			$('.anabelle-secondary-message').text(response.message);
		        			setTimeout(function() {
		        				greenTop();
		        				$('.anabelle-secondary-message').css({
									'opacity': 1,
									'top': 150
								});
		        			}, 200);

		        			setTimeout(function() {
		        				$('.anabelle-message').text(response.message);
		        				$('.anabelle-message, .anabelle-secondary-message').css('-webkit-transition:', 'initial');
		        				$('.anabelle-message').css('opacity', 1);
		        				$('.anabelle-secondary-message').css('opacity', 0);
		        				setTimeout(function() {
		        					$('.anabelle-message, .anabelle-secondary-message').css('-webkit-transition:', 'all .3s ease-in-out');
		        					$('.anabelle-secondary-message').css('top', 230);
		        				}, 1100);	
		        			}, 1000);

		        			console.log(response);
		        		}
		        	})
	        	}, timeoutVal);

	        	break;
		};
    }, false);

});

function greenTop() {
	$('#cube .cube-face').css({
		'background-color': 'rgba(71, 209, 71, 0.5)',
		'border-color': 'rgba(71, 209, 71, 0.7)'
	});
	setTimeout(function() {
		$('#cube .cube-face').css({
			'background-color': 'rgba(214, 214, 214, 0.5)',
			'border-color': '#BEBEBE'	
		});
	}, 200)
}

function redAround() {
	$('#cube .cube-face').css({
		'background-color': 'rgba(255, 204, 0, 0.5)',
		'border-color': 'rgba(255, 204, 0, 0.7)'
	});
	setTimeout(function() {
		$('#cube .cube-face').css({
			'background-color': 'rgba(214, 214, 214, 0.5)',
			'border-color': '#BEBEBE'	
		});
	}, 200)
}

function repeatRedAround() {
	redAround();
	setTimeout(redAround, 500);
	setTimeout(redAround, 1000);
}
