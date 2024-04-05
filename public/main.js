const imgPath = "https://image.tmdb.org/t/p/original";
const APIkey = "a8e19a122585b2c590ed78057f199563";
const api = "https://api.themoviedb.org/3";

const apipath = {
	fetchgenre: `${api}/genre/movie/list?api_key=${APIkey}`,
	fetchmovie: (id) =>
		`${api}/discover/movie?api_key=${APIkey}&with_genres=${id}`,
	fetchTrending: `${api}/trending/all/day?api_key=${APIkey}&language=en-US`,
};
function init() {
	buildsection(apipath.fetchTrending, "Trending Now");
	getmovie();
}
function getmovie() {
	fetch(apipath.fetchgenre)
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
			const categories = res.genres;

			if (Array.isArray(categories) && categories.length) {
				categories
					.slice(9, 11)
					.forEach((category) =>
						buildsection(apipath.fetchmovie(category.id), category.name)
					);
			}
		})
		.catch((err) => console.log(err));
}
function buildsection(fetchurl, categoryname) {
	return fetch(fetchurl)
		.then((res) => res.json())
		.then((res) => {
			const movies = res.results;
			if (Array.isArray(movies) && movies.length) {
				buildmovielist(movies, categoryname);
			}
		});
	return movies.catch((err) => console.error(err));
}
function buildmovielist(movie, categoryname) {
	const gen = document.getElementById("genre");
	console.log(movie, categoryname);

	const movielist = movie.map((movie) => {
		if (movie.backdrop_path == null || movie.backdrop_path == undefined) {
			movie.backdrop_path = movie.poster_path;
			if (movie.backdrop_path == null || movie.backdrop_path == undefined)
				return;
		}

		return categoryname == "Trending Now"
			? `<div class="divimg"><img class="img1" src="${imgPath}${movie.backdrop_path}" alt="${movie.title}">
        <div class="card-body">
        <button>PLAY</button>
        <p>Release date: ${movie.release_date}</p>
        <p>Rating : ${movie.vote_average}</p>
        <h3>${movie.title && movie.title.slice(0,14).trim()}</h3>
        </div>
        </div>`
			: `<div class="divimg"><img class="img1" src="${imgPath}${movie.backdrop_path}" alt="${movie.title}">
			<div class="card-body">
			<button>PLAY</button>
			<p>Release date: ${movie.release_date}</p>
			<p>Rating : ${movie.vote_average}</p>
			<h3>${movie.title && movie.title.slice(0,14).trim()}</h3>
			</div>
			</div>`
});
gen.innerHTML += `<div class="define">${categoryname}<span class="explore-nudge">Explore all -></span></div>
	<div class="sidebar">
	${movielist}</div>`;
}

window.addEventListener("load", function () {
	init();
});
function searchMovie() {
	const searchInput = document.getElementById('searchInput').value;
	const apiKey = '4c9550eb';

	fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchInput}`)
	  .then(response => response.json())
	  .then(data => {
		if (data.Response === 'True') {
		  const movieBannerHtml = `
			<!DOCTYPE html>
			<html>
			<head>
			  <title>${data.Title}</title>
			</head>
			<style>
			*{
				padding:0px;
				margin:0px;
				font-family: "poppins", sans-serif;
      			box-sizing: border-box;
			}
			.banner{
				height:100vh;
				background: linear-gradient(90deg, #000000, #000000a8);;
			}
			.info{
				position: absolute;
				top:30vh;
				margin-left:50px;
			}
			h1{
				font-size:50px;
				color:beige;
				padding-bottom: 30px;
			}
			.banner_info{
				color: green;
				font-size: 20px;
				padding-bottom: 25px;
			}
			.banner_description{
				width:34%;
				font-size: 20px;
				color:beige;
				padding-bottom: 25px;
			}
			.action-buttons-cont{
				display:flex;
			}
			.poster{
				display:flex;
				justify-content:center;
			}
			.poster img{
				width: 38%;
				height:100vh;
				position:absolute;
				left:46%;
			}
			</style>
			<body>
			<div class="banner">
			<div class="info">
			<h1 class="title">${data.Title}</h1>
			<p class="banner_info">imdb -> ${data.imdbRating} Released -> ${data.Released}</p> 
			<p class="banner_description">${data.Plot}</p>
			<div class="action-buttons-cont"> 
			<button class="action-button" style="
			border: none;
			border-radius: 4px;
			font-size: 16px;
			padding: 8px 23px;
			margin-right: 11px;
			display: flex;
			flex-direction: row;
			font-weight: 700;
			">play</button>

			<button class="action-button" style="
			border: none;
			border-radius: 4px;
			font-size: 16px;
			padding: 8px 23px;
			margin-right: 11px;
			display: flex;
			flex-direction: row;
			font-weight: 700;
			" >More info</button>
			</div>
			</div>
			<div class="poster">
			<img src="${data.Poster}" alt="${data.Title}">
			</div>
			</div>
			</body>
			</html>

			
		  `;
  
		  // Create a new Blob and URL to generate a downloadable HTML file.
		  const blob = new Blob([movieBannerHtml], { type: 'text/html' });
		  const url = URL.createObjectURL(blob);

		  window.open(url, '_blank');
		} else {
		  alert('Movie not found!');
		}
	  })
	  .catch(error => console.error('Error:', error));
  }
