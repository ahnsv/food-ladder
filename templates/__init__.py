from templates.views.views import view_blueprint
from factory import address_to_coords, searchByKeyword
from flask import Flask, request
app = Flask(__name__,
            static_folder='./public',
            template_folder="./static")


@app.route('/address_to_coords', methods=['GET'])
def get_coords():
    address = request.args.get('address')
    # TODO: return Response Instance
    resp = app.response_class(response=address_to_coords(
        address), status=200, mimetype='application/json')
    return resp


@app.route('/search_by_keyword', methods=['GET'])
def get_search_data():
    coord = request.args.get('coord')
    query = request.args.get('query')
    resp = app.response_class(response=searchByKeyword(
        coord=coord, query=query), status=200, mimetype='application/json')
    return resp


# register the blueprints
app.register_blueprint(view_blueprint)
