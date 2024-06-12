from deepface import DeepFace
from flask import Blueprint, request, jsonify
image_routes = Blueprint("image_routes", __name__)

# return the dominant emotion from the image
@image_routes.route('/', methods=['POST'])
def analyze_face():
    try:
        image = request.json["image"]
        result = DeepFace.analyze(image, actions = ['emotion'])
        sorted_emotions = sorted(result[0]["emotion"].items(),key=lambda x: x[1], reverse=True)
        return ({sorted_emotions[0][0]: sorted_emotions[0][1]})
    except Exception as error:
        return jsonify({'error': str(error)}), 500
