import requests

address_url = "https://dapi.kakao.com/v2/local/search/address.json"
keyword_url = "https://dapi.kakao.com/v2/local/search/keyword.json"

headers = {"Authorization": "KakaoAK {api}"}


def address_to_coords(query: str) -> list:
    new_url = keyword_url + '?query=' + query
    json = requests.get(new_url, headers=headers).json()
    res = []
    for address in json['documents']:
        res.append(dict(name=address['address_name'],
                        x=address['x'], y=address['y']))
    return res


def searchByKeyword(coord: dict, query: str) -> list:
    new_url = keyword_url + '?x=' + str(coord['x']) + \
        '&y=' + str(coord['y']) + '&query=' + query
    json = requests.get(new_url, headers=headers).json()
    candidates = []
    for place in json['documents']:
        candidates.append(
            {'place_name': place['place_name'], 'address_name': place['address_name'], 'category': place['category_name']})
    # TODO: get photos from place urls
    print(candidates)
    return json
