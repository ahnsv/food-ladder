import requests

address_url = "https://dapi.kakao.com/v2/local/search/address.json"
keyword_url = "https://dapi.kakao.com/v2/local/search/keyword.json"
image_url = "https://dapi.kakao.com/v2/search/image"
headers = {"Authorization": "KakaoAK 26218a6de622d05ea125dffbc73a3c38"}


def address_to_coords(query: str) -> list:
    new_url = keyword_url + '?query=' + query + '&size=5'
    json = requests.get(new_url, headers=headers).json()
    res = []
    for address in json['documents']:
        res.append(dict(name=address['address_name'],
                        x=address['x'], y=address['y']))
    return res


def search_by_keyword(coord: dict, query: str) -> list:
    new_url = keyword_url + '?x=' + str(coord['x']) + \
              '&y=' + str(coord['y']) + '&query=' + query + '&category_group_code=FD6&size=10'
    json = requests.get(new_url, headers=headers).json()
    candidates = []
    for place in json['documents']:
        # images = fetch_images(query=place['place_name'] + place['address_name'], size=5)
        candidates.append({'place_name': place['place_name'], 'address_name': place['address_name'],
                           'category': place['category_name'], 'url': place['place_url']})
    return candidates


def fetch_images(query: str, size: int) -> list:
    new_url = image_url + '?query=' + str(query) + '&size=' + str(size)
    response = requests.get(new_url, headers=headers).json()
    res = []
    for image_info in response['documents']:
        res.append({'thumbnail_url': image_info['thumbnail_url'], 'image_url': image_info['image_url']})
    return res
