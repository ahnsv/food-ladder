import React from 'react'
import axios from 'axios'
import {MainStarter} from "./MainStarter";
import {MainListView} from "./MainListView";
import {MainLadderView} from "./MainLadderView";

export default class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            query: '맛집',
            stage: 0
        };
        this.initialState = this.state;
        this.list = [];
        this.selection = []
    }

    handleSubmit(e) {
        if (this.state === this.initialState) return;
        if (e.key === 'Enter') {
            axios.get('/search', {
                params: {
                    address: this.state.location,
                    query: this.state.query
                }
            }).then(d => {
                if (d.status !== 200) {
                    console.log(d.statusText);
                    return
                }
                this.list = d
            }).then(() => {
                this.setState({
                    stage: ++this.state.stage
                })
            })
        }
    }

    handleChange(e) {
        switch (e.target.className) {
            case "location":
                this.setState({
                    location: e.target.value
                });
                break;
            case "query":
                this.setState({
                    query: e.target.value
                });
                break;
        }
    }

    handleSelection(data) {
        if (this.selection.filter(s => JSON.stringify(s) === JSON.stringify(data)).length !== 0) {
            return
        }
        this.selection = [...this.selection, data]
    }

    handleNextStage() {
        this.setState({
            stage: ++this.state.stage
        })
    }
    render() {
        return (
            <div className="main-view">
                {
                    this.state.stage === 0 &&
                    <MainStarter
                        handlers={{submit: this.handleSubmit.bind(this), change: this.handleChange.bind(this)}}/>
                }
                {
                    this.state.stage === 1 &&
                    <MainListView data={this.list} select={this.handleSelection.bind(this)} nextStage={this.handleNextStage.bind(this)} query={this.state.location}/>
                }
                {
                    this.state.stage === 2 &&
                        <MainLadderView select={this.selection} />
                }
            </div>
        )
    }
}

MainView.defaultProps = {
//    TODO: pull location info from GPS
};

