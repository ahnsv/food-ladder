from flask import render_template, Blueprint
from factory import searchByKeyword, address_to_coords
view_blueprint = Blueprint('view', __name__)

# TEST
addresses = address_to_coords(query="경북 김천시")
places = searchByKeyword(coord={'x': addresses[0]['x'],
                                'y': addresses[0]['y']}, query="맛집")


@view_blueprint.route('/')
@view_blueprint.route('/view')
def index():
    return render_template("index.html", places=places)
