from templates import app
from factory import address_to_coords, searchByKeyword
from flask import Flask, request

# app = Flask(__name__)


# @app.route('/address_to_coords/<address>', methods=['GET'])
# def get_coords(address: str):
#     return address_to_coords(address)


# @app.route('/search_by_keyword', methods=['GET'])
# def get_search_data():
#     coord = request.args.get('coord')
#     query = request.args.get('query')
#     return searchByKeyword(coord, query)


if __name__ == '__main__':
    app.config.from_object('configurations.DevelopmentConfig')
    app.run()
