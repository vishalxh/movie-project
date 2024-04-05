async function fetchMovieData(movieTitle) {
    const apiKey = '4c9550eb'; // Replace with your OMDB API key
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}&type=movie`);
    const data = await response.json();
    return data.Search || [];
  }
  
  // Function to display the movie banner of the searched movie
  function displayMovieBanner(movie) {
    const moviesContainer = document.getElementById('moviesContainer');
  
    moviesContainer.innerHTML = '';
  
    if (!movie) {
      moviesContainer.innerHTML = '<p>Movie not found!</p>';
      return;
    }
  
    const movieBanner = `
      <div class="movie">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <p>${movie.Title}</p>
      </div>
    `;
  
    moviesContainer.insertAdjacentHTML('beforeend', movieBanner);
  }
  
  // Function to handle form submission
  async function handleFormSubmit(event) {
    event.preventDefault();
  
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
  
    if (searchTerm !== '') {
      const movies = await fetchMovieData(searchTerm);
      const searchedMovie = movies.length > 0 ? movies[0] : null;
      displayMovieBanner(searchedMovie);
    }
  }
  
  // Event listener for form submission
  const searchForm = document.getElementById('searchForm');
  searchForm.addEventListener('submit', handleFormSubmit)