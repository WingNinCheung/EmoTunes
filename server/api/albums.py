from api.auth import get_spotify_access_token
from flask import Blueprint
import requests
album_routes = Blueprint("album_routes", __name__)

# Get recommended albums based on the specified emotion.
@album_routes.route('/', methods=['GET'])
def get_albums(emotion):
    access_token = get_spotify_access_token()
    emotion_ranges = {
        "happy": {"valence": (0.7, 1.0), "energy": (0.6, 1.0), "danceability": (0.5, 1.0)},
        "sad": {"valence": (0.0, 0.4), "energy": (0.3, 0.7), "danceability": (0.2, 0.6)},
        "angry": {"valence": (0.1, 0.4), "energy": (0.6, 1.0), "danceability": (0.3, 0.7)},
        "surprise": {"valence": (0.6, 0.9), "energy": (0.5, 0.8), "danceability": (0.5, 0.8)},
        "fear": {"valence": (0.0, 0.4), "energy": (0.2, 0.6), "danceability": (0.1, 0.5)},
        "disgust": {"valence": (0.0, 0.3), "energy": (0.2, 0.6), "danceability": (0.1, 0.5)},
        "neutral": {"valence": (0.4, 0.6), "energy": (0.4, 0.6), "danceability": (0.4, 0.6)},
    }
    if emotion not in emotion_ranges:
        emotion = "neutral"

    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    params = {
        'min_valence': emotion_ranges[emotion]["valence"][0],
        "max_valence":emotion_ranges[emotion]["valence"][1],
        "min_energy": emotion_ranges[emotion]["energy"][0],
        "max_energy": emotion_ranges[emotion]["energy"][1],
        "min_danceability": emotion_ranges[emotion]["danceability"][0],
        "max_danceability": emotion_ranges[emotion]["danceability"][1],
        'seed_genres': 'pop',
        'limit': 2
    }

    response = requests.get('https://api.spotify.com/v1/recommendations', headers=headers, params=params)
    tracks = response.json().get('tracks', [])

    albums = [{"album" : track["album"]} for track in tracks]
    return albums
