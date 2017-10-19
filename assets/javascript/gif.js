 $("button").on("click", function() {
      var animal = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {


        console.log(response);

  
        

        results= response.data;
       

        for (var i = 0; i < 4; i++) {
          var animalDiv= $("<div>");
          var p = $("<p>").text("Rating: "+ results[i].rating);
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);
          animalDiv.append(p);
          animalDiv.prepend(animalImage);
          $("#gifs-appear-here").prepend(animalDiv);
        
         }

      });
    });