from templates.views.views import view_blueprint
from flask import Flask
app = Flask(__name__,
            static_folder='./public',
            template_folder="./static")

# register the blueprints
app.register_blueprint(view_blueprint)
