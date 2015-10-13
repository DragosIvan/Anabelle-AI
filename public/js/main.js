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

	setTimeout(function() {
		repeatRedAround();
	}, 2000)

	document.addEventListener('keyup', function(e)
    {
		switch(e.keyCode)
		{
	        case 13:
	        	repeatRedAround();
	        	var data = {
	        		message: $('.anabelle-input').val()
	        	}

	        	$('.anabelle-input').val('');

	        	$.ajax({
	        		method: "POST",
	        		url: '/api/anabelle',
	        		data: data,
	        		success: function(p1, p2) {
	        			console.log(p1);
	        			console.log(p2);
	        		}
	        	})

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
		'background-color': 'rgba(255, 51, 51, 0.5)',
		'border-color': 'rgba(255, 51, 51, 0.7)'
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
