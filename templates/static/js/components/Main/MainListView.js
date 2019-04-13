import React from 'react'
import axios from 'axios'

class MainListView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            images: []
        }
    }

    passData(data) {
        this.props.select(data)
    }

    componentDidMount() {
        const self = this
        self.props.data.data.map(function (v, k) {
            return axios.get("https://dapi.kakao.com/v2/search/image", {
                params: {
                    query: `${self.props.query} ${v['place_name']}`,
                    size: 5
                },
                headers: {
                    "Authorization": "KakaoAK 26218a6de622d05ea125dffbc73a3c38"
                }
            }).then((res) => {
                console.log(res.data)
                self.setState({
                    images: [...self.state.images, res.data.documents]
                })
            })
        })
        self.forceUpdate()
    }


    render() {
        return (
            <div className="main-list-view">
                {
                    this.props.data &&
                    this.props.data.data.map((d, k) => {
                        const {place_name, category, url, address_name} = d
                        return (
                            <div className="list-view" key={k} onClick={() => this.passData({d})}>
                                <div>{place_name}</div>
                                <div>{category}</div>
                                <div>{url}</div>
                                <div>{address_name}</div>
                                <div>
                                    {
                                        (this.state.images.length !== 0) ? this.state.images.map((i, k) => {
                                                if (i.length === 0) return;
                                                return i.map((v, ky) => <img
                                                    src={v['image_url']}
                                                    key={ky}/>)
                                            }) :
                                            <div className="no_image">No image Available</div>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <div className="main-list-view--submit" onClick={this.props.nextStage}>
                    다음
                </div>
            </div>
        )
    }

}

export {MainListView}