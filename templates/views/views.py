from flask import render_template, Blueprint
view_blueprint = Blueprint('view', __name__)


@view_blueprint.route('/')
@view_blueprint.route('/view')
def index():
    return render_template("index.html")
