var userSearch
var apiKey = "9920fb12bf2316b80811a61d121e9ee8"
var trendingTitle = $(".trending")
var trendingImage = $(".trending-image")
var modalUrl = ""


//Set up trailer
$(".trending-image").on("click",function(event){
  var modalUrl = "https://www.youtube.com/embed/"+$(event.target).attr("data-trend-trailer")+"?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1"
  $("iframe").attr("src",modalUrl)
})

//Reload modal
$("#close-modal").on("click",function(){
  $("iframe").attr("src",modalUrl)
})

// Redirect to Search.html with user search input
$("#search-button").on("click",function(){
  userSearch = jQuery.trim($("#search-input").val())
  if (!userSearch){
    console.log("Been pageSetup")
  }else{
      window.location.href="./search.HTML?search="+userSearch;
  }
})


// Store to localStorage
$("#add-list").on("click",function(){
  console.log("Been add to List")
  console.log($(this))

})


// Trending List
function trendingLoad(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTIwZmIxMmJmMjMxNmI4MDgxMWE2MWQxMjFlOWVlOCIsInN1YiI6IjY0NzJhNzhhZGQ3MzFiMmQ3NjJiMWM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjPedgCP88M_DZ-j_oNc5oIg6P52b4kk-6aLHGgIy3A'
        }
      };

    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then(response => response.json())
      .then(function(data){
        console.log(data)
        for (i=0; i<8; i++){
          trendingTitle[i].textContent=data.results[i].title
          getPoster(data.results[i].poster_path,$(trendingImage[i]))
          gettrailerKey(data.results[i].id,$(trendingImage[i]))
        }
      })
}

// Load trending poster
function getPoster(posterPath,Ele){
  var trendingPoster = "https://image.tmdb.org/t/p/w500" + posterPath
  Ele.attr("src",trendingPoster)
}

// Get trending movie's trailer key
function gettrailerKey(filmID,Ele){
  var urlTrailer = "https://api.themoviedb.org/3/movie/" + filmID + "/videos?api_key=9920fb12bf2316b80811a61d121e9ee8'"

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTIwZmIxMmJmMjMxNmI4MDgxMWE2MWQxMjFlOWVlOCIsInN1YiI6IjY0NzJhNzhhZGQ3MzFiMmQ3NjJiMWM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjPedgCP88M_DZ-j_oNc5oIg6P52b4kk-6aLHGgIy3A'
    }
  };

  fetch(urlTrailer, options)
    .then(response => response.json())
    .then(function(data){
      var trailer = data.results.filter(function(el){
        return el.name === "Official Trailer"})

      if (!trailer[0]){var trailer = data.results.filter(function(el){
        return el.type = "Trailer"})}              
      Ele.attr("data-trend-trailer",trailer[0].key)
      Ele.attr("data-id",filmID)
    })

}

//function to load the list page on click at homepage
function listLoad(tabName) {
  var url = "./list.HTML";
  var targetTab;
  console.log(tabName);
  switch (tabName) {
      case "tabMovies":
          targetTab = "moviesTabBtn";
          break;
      case "tabTvshows":
          targetTab = "tvShowsTabBtn";
          break;
      default:
          targetTab = "moviesTabBtn";
          break;
  }
  
  window.open(url, targetTab);
}

trendingLoad()
picture()
