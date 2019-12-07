$(function() {

})

var pokemon = ["pikachu", "squirtle", "charmander", "bulbasaur", "meowth", "magicarp"];

function renderButtons() {
    $("#buttons-view").empty();

for (var i = 0; i < pokemon.length; i++) {
    var b = $("<button class='btn btn-info'>");
    b.addClass("pokemon-btn");
    b.attr("data-name", pokemon[i]);
    b.text(superHeroes[i]);
    $("#buttons-view").append(b);
    }
};

function displayRatingInfo() {
    var r = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + r + "&api_key=VZ7jgxNiu7qvs0S6NRHV4KkD14jDyEjz";
    $.ajax({
        url:queryURL,
        method: 'GET'
    }).then(function(response) {
        var results = response.data;

        $('#pokemon-view').empty();

            for(var i=0; i < results.length; i++) {
                var pokemonDiv = $("<div class='pokE'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var pokemonImage = $("<img>");

                pokemonImage.attr("src", results[i].images.fixed_height_still.url);
                pokemonImage.attr("data-still", results[i].images.fixed_height_still.url);
                pokemonImage.attr("data-animate", results[i].images.fixed_height.url);
                pokemonImage.attr("data-state", "still")
                pokemonImage.attr("class", "pause")
                pokemonDiv.prepend(p);
                pokemonDiv.prepend(heroImage);
                $('#pokemon-view').prepend(pokemonDiv);

            }
        });


        $('#add-pokemon').on('click', function(event) {
        var pokes = $("#pokemon-input").val().trim();
        pokemon.push(pokes);
        renderButtons();
});

$('#add-pokemon').on('click', '.pause', function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
 });

 $(document).on('click', '.pokemon-btn', displayRatingInfo);

 renderButtons();