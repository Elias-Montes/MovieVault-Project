var apiKey = "9920fb12bf2316b80811a61d121e9ee8";
var userSearchEl = document.querySelector('#search-input');
var userSearch
var searchEls = $(".search")
var searchImage = $(".search-image")

$("#search-button").on("click",function(){
    userSearch = $("#search-input").val()
    console.log(userSearch);
    var input = searches.value.trim();
    function search(){
    window.location.href="./search.HTML?search="+input;
};
    search();
})


var getUserSearch = function () {
    var searchstring = document.location.search;
    var userSearch = decodeURI(searchstring.split('=')[1]);
    console.log(userSearch);
    
    if (userSearch) {
        userSearchEl.textContent = userSearch;

        searchResultsData(userSearch);
    }
}; 
  
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
            console.log(data)
            console.log($(".trending-image"))
          for (i=0; i<8; i++){
              searchEls[i].textContent=data.results[i].title
              var searchResultPoster = "https://image.tmdb.org/t/p/w500" + data.results[i].poster_path
              console.log(searchResultPoster)
              $(searchImage[i]).attr("src",searchResultPoster)
              
            }
        })
        
  };
  getUserSearch();
