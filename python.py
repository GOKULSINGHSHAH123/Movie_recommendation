import sys
import json
import pickle
import pandas as pd

def recommended(movie, movies, similarity):
    try:
        movie_index = movies[movies['title'] == movie].index[0]
        distances = similarity[movie_index]
        movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:9]
        # Convert numpy.int64 to int before returning
        movie_ids = [int(movies.iloc[i[0]].movie_id) for i in movies_list]
        return movie_ids
    except Exception as e:
        print(f"An error occurred: {e}")
        return []

if __name__ == "__main__":
    input_data = sys.argv[1]  # Receive string from Node.js script

    try:
        # Load movie data and similarity matrix
        movies_list = pickle.load(open('movies.pkl', 'rb'))
        similarity = pickle.load(open('similarity.pkl', 'rb'))
        movies = pd.DataFrame(movies_list)

        # Get recommended movie IDs
        recommended_movies = recommended(input_data, movies, similarity)
        

        # Print the recommended movie IDs as JSON
        print(json.dumps(recommended_movies))
    except Exception as e:
        print(f"An error occurred while processing: {e}")
