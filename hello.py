from flask import Flask
import requests
app = Flask(__name__)

url = "https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=20000&query=맛집"
headers = {"Authorization": "KakaoAK {api}"}


@app.route("/")
def hello():
    json = requests.get(url, headers=headers).json()
    candidates = []
    for place in json['documents']:
        candidates.append(
            {'place_name': place['place_name'], 'address_name': place['address_name'], 'category': place['category_name'], 'photo_url': place['photo_url']})
    # TODO: get photos from place urls
    print(candidates)
    return str(json)


if __name__ == '__main__':
    app.run()
