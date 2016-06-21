var characters = ['Bugs Bunny', 'Fry', 'Homer Simpson', 'Stewie Griffin', 'Eric Cartman', 'Wakko', 'Mr. Rogers', 'Mario', 'The Doctor', 'Batman', 'Sherlock Holmes', 'Winnie the Pooh', 'Jon Stewart'];

function displayGIF(){
	$('.jumbotron').empty();

	var characterName = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + characterName + "&api_key=dc6zaTOxFJmzC";
	
	$.ajax({
		url: queryURL, 
		method: 'GET'
	}).done(function(response) {
		for (var i = 0; i < 10; i++) {
	   	var charactDiv = $('<div id="images">');
			var p = $('<p>');
   			p.text("Rating: " + response.data[i].rating);
			var charactImage = $('<img>', {
   			src : response.data[i].images.original_still.url,
			});
			charactImage.data('still', response.data[i].images.original_still.url);
			charactImage.data('animate', response.data[i].images.original.url);
			charactImage.data('state', 'still');

			charactDiv.append(p);
			charactDiv.append(charactImage);
			$('.jumbotron').append(charactDiv);

			charactImage.on('click', function(){
				var state = $(this).data('state');
				if (state === 'still') {
					$(this).data('state', 'animate');
					var animateUrl = $(this).data('animate');
					$(this).attr('src', animateUrl);
				} else {
					$(this).data('state', 'still');
					var stillUrl = $(this).data('still');
					$(this).attr('src', stillUrl);
				}
			});
		}
	});
}

function renderButtons(){
	$('#buttonsView').empty();
	for (var i = 0; i < characters.length; i++){
	    var charButton = $('<button>');
	    charButton.addClass('characterClass');
	    charButton.attr('data-name', characters[i]);
	    charButton.text(characters[i]);
	    $('#buttonsView').append(charButton);
	}
}

$('#addCharacter').on('click', function(){
	var char = $('#characterInput').val().trim();
	characters.push(char);
	renderButtons();
	$('#characterInput').val('');

	return false;
});

$(document).on('click', '.characterClass', displayGIF);

renderButtons();