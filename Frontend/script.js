document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded event triggered");

    var movieId = getParameterByName('movie');
    
    console.log("Movie ID from URL parameter:", movieId);
    console.log(typeof movieId)

    if (movieId !== null) {
        document.getElementById('movieId').innerText = "Movie ID: " + movieId;
    } else {
        document.getElementById('movieId').innerText = "Movie ID not found";

    }
  
    movieId = Number(movieId);
    movieId = [movieId];
    getdata(movieId,"container2")
});

let titles;

fetch('movies.json')
  .then(response => response.json())
  .then(data => {

    titles = Object.values(data.title);

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


function filterFunction() {
    let input, filter, a, i, txtValue;
    input = document.getElementsByClassName('searchbar')[0]; // Accessing the first element
    filter = input.value.toUpperCase();
    div = document.getElementById('dropdown');

    titles.forEach(function(item) {
        var optionElement = document.createElement("a");
        optionElement.href = "#";
        optionElement.textContent = item;
        optionElement.onclick = function() {
            selectItem(item);
        };
        div.appendChild(optionElement);
    });

    a = div.getElementsByTagName('a');

    let found = false; // Flag to track if any item is found

    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "block";
            found = true; // Item found
        } else {
            a[i].style.display = "none";
        }
    }

    if (filter !== '' && found) { // Show dropdown only if filter is not empty and at least one item is found
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}




function selectItem(item) {
    document.getElementsByClassName('searchbar')[0].value = item;
    document.getElementById('dropdown').style.display = 'none';
}   

let recommended_movies = [];
let recommended_movies_poster = [];
let overview = [];
let id = [];

const getdata = async (myList,a) => {
    recommended_movies = [];
    recommended_movies_poster = [];
    overview= [];
    vote_average = [];
    date =[];
    id =[];


    for (let i = 0; i < myList.length; i++) {
        movieId = myList[i];
        id.push(movieId);
        
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US`);
            const data = await response.json();
            recommended_movies.push(data.original_title);
            recommended_movies_poster.push(`https://image.tmdb.org/t/p/w500/${data.poster_path}`);
            overview.push(data.overview)
            if(a=="container2"){
                vote_average.push(data.vote_average)
                date.push(data.release_date)

            }
        } catch (error) {
            console.error('Error fetching data for movie with ID', movieId, ':', error);
        }
        console.log(recommended_movies)
    }

    
    displayMovies(a); // Call function to display movies after data is fetched
};

function displayMovies(a) {
   
    let container ; 
    
    if(a=="container2"){
        container = document.getElementById('movies-container2');
        console.log("container2 hits")
    }
    else if(a=="container3"){
        container = document.getElementById('movies-container3')
        console.log("container 3 hits")
    }
    else{
        container = document.getElementById('movies-container');
        console.log("container hits")
    }
    
    // Clear the container only if it already contains movie card
    if(a!="container2"){
        container.innerHTML =''
        
    }   


    if(a=="container2"){
        console.log("hits")
        image = document.getElementById("image");
        movieName = document.getElementById("name");
        movieDate = document.getElementById("date");
        movieRating = document.getElementById("rating");
        overviewp = document.getElementById("overviewp");


        image.src = recommended_movies_poster[0];
        movieName.textContent = recommended_movies[0];
        movieDate.textContent = date[0];
        movieRating.textContent = vote_average[0];
        overviewp.textContent = overview[0];

        let a = recommended_movies[0]
    
                console.log(a)
                fetch('http://localhost:3000/', { // This URL should be the endpoint where your backend handles the POST request
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movieName: a})
        })
        .then(response => response.json())
        .then(data => {
            getdata(data, 'container3')
        })
        .catch((error) => console.error('Error:', error));
            }


    

    else{
        for (let i = 0; i < recommended_movies.length; i++) {

        
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('card');
    
            const movieImage = document.createElement('img');
            movieImage.src = recommended_movies_poster[i];
            movieImage.alt = 'Movie Poster';
    
            const movieName = document.createElement('span');
            movieName.textContent = recommended_movies[i];
    
            const  movieDescription = document.createElement('p')
            movieDescription.textContent = overview[i]
    
            movieDiv.appendChild(movieImage);
            movieDiv.appendChild(movieName);
            container.appendChild(movieDiv);
    
            movieDiv.addEventListener('click', function() {
                // Open the empty HTML file and pass data
                window.open(`overview.html?movie=${encodeURIComponent(id[i])}`, '_blank');
            });
        }
    
    }
}

document.getElementById('movieForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    var movieName = document.querySelector('.searchbar').value; // Get the value from the input
    movieName = String(movieName)

    fetch('http://localhost:3000/', { // This URL should be the endpoint where your backend handles the POST request
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieName: movieName })
    })
    .then(response => response.json())
    .then(data => {
        getdata(data)
    })
    .catch((error) => console.error('Error:', error));
})

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(movies => {
            getdata(movies, " ");
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
});


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Your other functions
