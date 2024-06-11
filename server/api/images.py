from deepface import DeepFace
from flask import Blueprint

image_routes = Blueprint("image_routes", __name__)

# return the dominant emotion from the image
@image_routes.route('/', methods=['GET'])
def analyze_face(image):
    result = DeepFace.analyze(image, actions = ['emotion'])
    sorted_emotions = sorted(result[0]["emotion"].items(),key=lambda x: x[1], reverse=True)
    return dict(sorted_emotions[0])

