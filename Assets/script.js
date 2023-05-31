var userSearch
var apiKey = "9920fb12bf2316b80811a61d121e9ee8"
var trendingEls = $(".trending")
var trendingImage = $(".trending-image")

$("#search-button").on("click",function(){
    userSearch = $("#search-input").val()
    console.log(userSearch)
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
          console.log($(".trending-image"))
          for (i=0; i<4; i++){
              //console.log(data.results[i].title)
              trendingEls[i].textContent=data.results[i].title
              var trendingPoster = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path
              console.log(trendingPoster)
              //trendingEls[i].children(i).attr("src",trendingPoster)
              $(trendingImage[i]).attr("src",trendingPoster)
              
            }


        })
}

trendingLoad()

// Search for "Movie/TV/Person"
// Get ID, Title and Poster
// https://api.themoviedb.org/3/search/movie?api_key=9920fb12bf2316b80811a61d121e9ee8&query=Jack+Reacher
// Access to poster: https://image.tmdb.org/t/p/original/lD8V3DBban95Mxz4sjuA81Tw771.jpg
// Access to trailer:

