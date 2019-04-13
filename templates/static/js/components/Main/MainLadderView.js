import React from 'react'

class MainLadderView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'ready'
        }
        console.log(`${this.props.select.length} are received!`)
    }


}

export {MainLadderView}