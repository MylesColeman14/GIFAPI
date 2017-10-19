var animals = []

function changeState(){
  event.preventDefault();
  var state = $(this).attr("data-state");
  if(state === "still")
  {
    console.log("hi");
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr("data-state", "animate");
  }else
  {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr("data-state", "still");
  }
}

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
    a.addClass("animal-button");
    a.attr("data-animal", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);
    console.log(animals[i])
    console.log(i);
  }
}

function displayGif(){
  event.preventDefault();
  var animal = $(this).attr("data-animal");
  console.log(animal);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    results= response.data;
       
    for (var i = 0; i < animal.length; i++) {
      var animalDiv= $("<div>");
      var p = $("<p>").text("Rating: "+ results[i].rating);
      var animalImage = $("<img>");
      animalImage.addClass("gif");
      animalImage.attr("src", results[i].images.fixed_height_still.url);
      animalImage.attr("data-still", results[i].images.fixed_height_still.url);
      animalImage.attr("data-animate", results[i].images.fixed_height.url);
      animalImage.attr("data-state", "still");
      animalDiv.append(p);
      animalDiv.prepend(animalImage);
      $("#gifs-appear-here").prepend(animalDiv);
    }

  });
}

$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var animal = $("#animal-input").val().trim();
  animals.push(animal);
  renderButtons();
});
$(document).on("click", ".animal-button", displayGif);
$(document).on("click", ".gif",changeState);