var apiKey = "9920fb12bf2316b80811a61d121e9ee8";
var userSearchEl = document.querySelector('#search-input');
var userSearch
var searchEls = $(".search")
var searchImage = $(".search-image")

$("#search-button").on("click",function(){
    userSearch = jQuery.trim($("#search-input").val())
    if (userSearch){
        window.location.href="./search.HTML?search="+userSearch;
    }
})

function pageSetup(){
    if (document.location.search){
        getUserSearch()
    }
}


// Redirect to search page after searching in index.html 
var getUserSearch = function () {
    var searchstring = document.location.search;
    var userSearch = decodeURI(searchstring.split('=')[1]);
    console.log(userSearch);
    
    if (userSearch) {
        userSearchEl.textContent = userSearch;
        searchResultsData(userSearch);
    }
}; 

// Retrieve information from user input
function searchResultsData(user) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTIwZmIxMmJmMjMxNmI4MDgxMWE2MWQxMjFlOWVlOCIsInN1YiI6IjY0NzJhNzhhZGQ3MzFiMmQ3NjJiMWM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjPedgCP88M_DZ-j_oNc5oIg6P52b4kk-6aLHGgIy3A'
      }
    };
    fetch("https://api.themoviedb.org/3/search/movie?query=" + user + '&api_key=' + apiKey)
        .then(response => response.json())
        .then(function(data){
            // console.log(data)
            // console.log($(".trending-image"))
            // console.log("been here")
          for (i=0; i<8; i++){
            searchEls[i].textContent=data.results[i].title
            getPoster(data.results[i].poster_path,$(searchImage[i]))
            //gettrailerKey(data.results[i].id,$(trendingImage[i]))

            //   var searchResultPoster = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path
            //   console.log(searchResultPoster)
            //   $(searchImage[i]).attr("src",searchResultPoster)
              
            }
        }) 
  };

function getPoster(posterPath,Ele){
    var searchingPoster = "https://image.tmdb.org/t/p/w500" + posterPath
    console.log(searchingPoster)
    Ele.attr("src",searchingPoster)
}


//null poster path: pexel
//0Hruyh1T07GCKyGt53A7CckpNVq9P0vPx4d87asBLvmQ44T79APdbS8L
function picture(){
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: '0Hruyh1T07GCKyGt53A7CckpNVq9P0vPx4d87asBLvmQ44T79APdbS8L'
      }
    };
    
    fetch("https://api.pexels.com/v1/curated?per_page=4", options)
    .then(response => response.json())
    .then(function(data){
      console.log(data)})
    }
  


  pageSetup();
