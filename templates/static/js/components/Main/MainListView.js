import React from 'react'
import axios from 'axios'

class MainListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    passData(e, data) {
        e.preventDefault();
        const target = e.target;
        target.classList.toggle('selected');
        this.props.select(data)
    }

    componentDidMount() {
        const self = this;
        Promise.all(self.props.data.data.map((v, k) => {
                return axios.get("https://dapi.kakao.com/v2/search/image", {
                    params: {
                        query: `${self.props.query} ${v['place_name']}`,
                        size: 5
                    },
                    headers: {
                        "Authorization": "KakaoAK 26218a6de622d05ea125dffbc73a3c38"
                    }
                }).then((response) => {
                    return response.data.documents
                })
            })
        ).then((response) => {
            console.log(response);
            self.setState({
                images: response
            })
        })
    }


    render() {
        return (
            <div className="main-list-view">
                {
                    this.props.data &&
                    this.props.data.data.map((d, k) => {
                        const {place_name, category, url, address_name} = d;
                        return (
                            <div className="list-view" key={k} onClick={(e) => this.passData(e, {d})}>
                                <div className="list-view--images">
                                    {
                                        (this.state.images.length !== 0) ? this.state.images[k].map((i, ky) => {
                                                if (i.length === 0) return;
                                                return (<img
                                                    src={i['thumbnail_url']}
                                                    key={ky}/>)
                                            }
                                            ) :
                                            <div className="no_image">No image Available</div>
                                    }
                                </div>
                                <div className="list-view--title"><a href={url}>{place_name}</a></div>
                                <div>{category}</div>
                                <div>{address_name}</div>
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