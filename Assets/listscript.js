const APIKEY = "2dc50a9bc3cced874f42eac4a32c1e6f";
var detailsButtonE1 = document.querySelector('#detailsButton');
// Check if local storage is available
function isLocalStorageAvailable() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}

function detailsLoad(title,listId) {
  console.log(title);
    const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTIwZmIxMmJmMjMxNmI4MDgxMWE2MWQxMjFlOWVlOCIsInN1YiI6IjY0NzJhNzhhZGQ3MzFiMmQ3NjJiMWM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CjPedgCP88M_DZ-j_oNc5oIg6P52b4kk-6aLHGgIy3A'
    }
  };

  fetch('https://api.themoviedb.org/3/search/movie?query=' + encodeURIComponent(title) + '&api_key=' + APIKEY, options)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      console.log(data);
      //Iterate through the movies and append details to the list
      var movie = movies[0];
        const listItem = document.createElement('li');
        const movieTitle = document.createElement('h3');
        const movieOverview = document.createElement('p');
        const movieReleaseDate = document.createElement('p');

        movieTitle.textContent = movie.title;
        movieOverview.textContent = movie.overview;
        movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;

        listItem.appendChild(movieTitle);
        listItem.appendChild(movieOverview);
        listItem.appendChild(movieReleaseDate);

        document.getElementById(listId).appendChild(listItem);
     
    })
    .catch(error => console.log('Error:', error));
}

// Add movie to watched list
function addWatchedMovie() {
  //event.preventDefault();
  const movieTitle = $('#watchedMovieInput').val();
  if (movieTitle.trim() === '') return;
  console.log(movieTitle);
  const listItem = `<li class="py-2">${movieTitle}<button id="detailsButton" onclick="detailsLoad('${movieTitle}','watchedMoviesList')" class="ml-2 bg-blue-500 text-white px-2 py-1 rounded">Details</button></li>`;
  console.log(listItem);
    $('#watchedMoviesList').append(listItem);
  $('#watchedMovieInput').val('');

  saveToLocalStorage('watchedMoviesList');
  //detailsLoad(movieTitle);
}

// Add movie to to-watch list
function addToWatchMovie() {
  const movieTitle = $('#toWatchMovieInput').val();
  if (movieTitle.trim() === '') return;

  const listItem = `<li class="py-2">${movieTitle}<button id="detailsButton" onclick="detailsLoad('${movieTitle}','toWatchMoviesList')" class="ml-2 bg-blue-500 text-white px-2 py-1 rounded">Details</button></li>`;
  $('#toWatchMoviesList').append(listItem);
  $('#toWatchMovieInput').val('');

  saveToLocalStorage('toWatchMoviesList');
  //detailsLoad(movieTitle);
}

// Add TV show to watched list
function addWatchedTVShow() {
  const tvShowTitle = $('#watchedTVShowInput').val();
  if (tvShowTitle.trim() === '') return;

  const listItem = `<li class="py-2">${tvShowTitle}<button id="detailsButton" onclick="detailsLoad('${tvShowTitle}','watchedTVShowsList')" class="ml-2 bg-blue-500 text-white px-2 py-1 rounded">Details</button></li>`;
  $('#watchedTVShowsList').append(listItem);
  $('#watchedTVShowInput').val('');

  saveToLocalStorage('watchedTVShowsList');
  //detailsLoad(tvShowTitle);
}

// Add TV show to to-watch list
function addToWatchTVShow() {
  const tvShowTitle = $('#toWatchTVShowInput').val();
  if (tvShowTitle.trim() === '') return;

  const listItem = `<li class="py-2">${tvShowTitle}<button id="detailsButton" onclick="detailsLoad('${tvShowTitle}','toWatchTVShowsList')" class="ml-2 bg-blue-500 text-white px-2 py-1 rounded">Details</button></li>`;
  $('#toWatchTVShowsList').append(listItem);
  $('#toWatchTVShowInput').val('');

  saveToLocalStorage('toWatchTVShowsList');
  //detailsLoad(tvShowTitle);
}

// Save list to local storage
function saveToLocalStorage(key) {
  if (!isLocalStorageAvailable()) return;

  const listItems = $('#' + key).html();
  localStorage.setItem(key, listItems);
}

// Load lists from local storage
function loadFromLocalStorage() {
  if (!isLocalStorageAvailable()) return;

  const watchedMoviesList = localStorage.getItem('watchedMoviesList');
  if (watchedMoviesList) $('#watchedMoviesList').html(watchedMoviesList);

  const toWatchMoviesList = localStorage.getItem('toWatchMoviesList');
  if (toWatchMoviesList) $('#toWatchMoviesList').html(toWatchMoviesList);

  const watchedTVShowsList = localStorage.getItem('watchedTVShowsList');
  if (watchedTVShowsList) $('#watchedTVShowsList').html(watchedTVShowsList);

  const toWatchTVShowsList = localStorage.getItem('toWatchTVShowsList');
  if (toWatchTVShowsList) $('#toWatchTVShowsList').html(toWatchTVShowsList);
}

$(document).ready(function () {
  loadFromLocalStorage();

  // Tab switch event handlers
  $('#moviesTabBtn').on('click', function () {
    $('#moviesTab').removeClass('hide');
    $('#tvShowsTab').addClass('hide');
  });

  $('#tvShowsTabBtn').on('click', function () {
    $('#moviesTab').addClass('hide');
    $('#tvShowsTab').removeClass('hide');
  });

  // Movie event handlers
  $('#addWatchedMovieBtn').on('click', addWatchedMovie);
  $('#addToWatchMovieBtn').on('click', addToWatchMovie);

  // TV show event handlers
  $('#addWatchedTVShowBtn').on('click', addWatchedTVShow);
  $('#addToWatchTVShowBtn').on('click', addToWatchTVShow);
  //$('#detailsButton').on('click', detailsLoad);

  // detailsButtonE1.addEventListener('click', detailsLoad());
});