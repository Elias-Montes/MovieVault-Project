var userSearch
var apiKey = "9920fb12bf2316b80811a61d121e9ee8"
var trendingTitle = $(".trending")
//var trendingDiv = $(".trending-div")
var trendingImage = $(".trending-image")

var modalUrl = ""

//pexel
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



// curl -H "Authorization: YOUR_API_KEY" \
//   "https://api.pexels.com/v1/search?query=nature&per_page=1"




$("#search-button").on("click",function(){
    userSearch = $("#search-input").val()
    //console.log(userSearch)
})

//Set up trailer
$(".trending-image").on("click",function(event){
  //$(event.target).attr("data-trend-trailer"))

  var modalUrl = "https://www.youtube.com/embed/"+$(event.target).attr("data-trend-trailer")+"?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1"
  $("iframe").attr("src",modalUrl)
  //console.log(modalUrl)
})

//Reload modal
$("#close-modal").on("click",function(){
  $("iframe").attr("src",modalUrl)
  //console.log(modalUrl)  

var searches = document.querySelector('#search-input');

$("#search-button").on("click",function(){
    userSearch = $("#search-input").val()
    console.log(userSearch);
    var input = searches.value.trim();
    function search(){
    window.location.href="./search.HTML?search="+input;
};
    search();

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
        //console.log($(".trending-image"))
        for (i=0; i<4; i++){
          trendingTitle[i].textContent=data.results[i].title
          //$(trendingDiv[i]).attr("data-id",data.results[i].id)//Store trending film id 
          getPoster(data.results[i].poster_path,$(trendingImage[i]))
          gettrailerKey(data.results[i].id,$(trendingImage[i]))
        }
      })
}

            //getTrailer(data.results[i].poster_path,$(trendingImage[i]))

function getPoster(posterPath,Ele){
  var trendingPoster = "https://image.tmdb.org/t/p/w500" + posterPath
  Ele.attr("src",trendingPoster)
}


// Get trailer key
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
      //Get "official Trailer" or "Trailer"
      var trailer = data.results.filter(function(el){
        return el.name === "Official Trailer"})

      if (!trailer[0]){var trailer = data.results.filter(function(el){
        return el.type = "Trailer"})}              
      //return trailer[0]
      //console.log(trailer[0])

      // console.log('been here')
      // console.log(trailer[0].key)
      Ele.attr("data-trend-trailer",trailer[0].key)
      //return trailer[0].key

      // $('iframe').attr("src","https://www.youtube.com/embed/"+trailer[0].key+"modestbranding=1&rel=0&controls=0&showinfo=0&html5=1")
      // <iframe width="560" height="315" src="https://www.youtube.com/embed/SUXWAEX2jlg?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" style="margin:0 auto" allowfullscreen></iframe>

      //Get key
      //Update ifram link
    })

}

trendingLoad()
//picture()