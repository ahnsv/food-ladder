from templates.views.views import view_blueprint
from factory import address_to_coords, search_by_keyword
from flask import Flask, request, jsonify
app = Flask(__name__,
            static_folder='./public',
            template_folder="./static")


@app.route('/search', methods=['GET'])
def search():
    address = request.args.get('address')
    query = request.args.get('query')
    coords = address_to_coords(query=address)
    response = search_by_keyword(coord=coords[0], query=query)
    return jsonify(response)


@app.route('/address_to_coords', methods=['GET'])
def get_coords():
    address = request.args.get('address', type=str)
    return jsonify(address_to_coords(query=address))

@app.route('/search_by_keyword', methods=['GET'])
def get_search_data():
    coord = request.args.get('coord')
    query = request.args.get('query')
    return jsonify(search_by_keyword(coord=coord, query=query))

# register the blueprints
app.register_blueprint(view_blueprint)
