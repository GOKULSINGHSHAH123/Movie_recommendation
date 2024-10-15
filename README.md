# Movie Recommendation System

## Overview
This project implements a movie recommendation system using a dataset of movies from TMDb (The Movie Database). The system leverages various features of the movies, including genres, keywords, cast, crew, and plot overviews, to generate recommendations.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Data](#data)
- [Preprocessing](#preprocessing)
- [Features](#features)
- [Modeling](#modeling)
- [Results](#results)
- [License](#license)

## Installation
To run this project, ensure you have Python 3.x installed. You will also need to install the required libraries. You can install the necessary libraries using pip:


pip install numpy pandas nltk scikit-learn


Usage
Clone the repository:

bash
Copy code
git clone <repository_url>
cd movie-recommendation-system
Download the dataset from Kaggle or directly from the TMDb website and place the CSV files in the data folder.

Run the Jupyter Notebook or Python script:

bash
Copy code
jupyter notebook movie_recommendation_system.ipynb
Follow the instructions in the notebook for generating movie recommendations.

Data
The project utilizes two CSV files from TMDb:

tmdb_5000_movies.csv: Contains metadata about the movies.
tmdb_5000_credits.csv: Contains information about the cast and crew of the movies.
Data Schema
The relevant columns used for the recommendation system are:

movie_id: Unique identifier for each movie.
title: Title of the movie.
overview: Brief description of the movie.
genres: List of genres associated with the movie.
keywords: List of keywords related to the movie.
cast: Top three actors in the movie.
crew: Director of the movie.
Preprocessing
The dataset undergoes several preprocessing steps:

Merge movies and credits data.
Drop unnecessary columns.
Handle missing values by removing rows with null entries.
Extract and preprocess genres, keywords, cast, and crew data.
Lowercase all textual data and remove spaces.
Features
The recommendation system is based on a combination of:

Overview: The plot summary of the movie.
Genres: The categories the movie belongs to.
Keywords: Key terms associated with the movie.
Cast: The main actors involved in the movie.
Crew: The director of the movie.
Modeling
The system uses text-based features to create a combined "tags" column for each movie. TF-IDF (Term Frequency-Inverse Document Frequency) is used to convert the text data into numerical vectors, which are then utilized to compute cosine similarity for generating recommendations.

Results
The system returns a list of recommended movies based on the input movie title. The recommendations are derived from the cosine similarity scores calculated from the "tags" feature.

