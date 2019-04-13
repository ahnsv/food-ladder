from flask import render_template, Blueprint, abort, request
from factory import search_by_keyword, address_to_coords
from jinja2 import TemplateNotFound
view_blueprint = Blueprint('view', __name__)

# TEST
addresses = address_to_coords(query="경북 김천시")
places = search_by_keyword(coord={'x': addresses[0]['x'],
                                'y': addresses[0]['y']}, query="맛집")


@view_blueprint.route('/')
@view_blueprint.route('/view')
def index():
    try:
        return render_template("index.html")
    except TemplateNotFound:
        abort(404)


@view_blueprint.errorhandler(404)
def page_not_found(e):
    return render_template('404.html')
