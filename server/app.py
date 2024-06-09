from flask import Flask, request, jsonify
from flask_cors import CORS
from api.images import image_routes

app = Flask(__name__)
app.register_blueprint(image_routes, url_prefix="/api/images")
CORS(app)



