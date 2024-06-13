from flask import Flask
from flask_cors import CORS
from api.images import image_routes
from api.auth import auth_routes
from api.albums import album_routes
app = Flask(__name__)

app.register_blueprint(image_routes, url_prefix="/api/images")
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(album_routes, url_prefix="/api/albums")

CORS(app)
