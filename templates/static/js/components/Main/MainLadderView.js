import React from 'react'

class MainLadderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'ready'
        }
    }

    updateCanvas() {

    }

    drawInitialCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        for (let i = 0; i < this.props.select.length; i++) {
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.moveTo(ctx.canvas.width * 0.1 + ((ctx.canvas.width * 0.9) / this.props.select.length) * i, ctx.canvas.height * 0.1);
            ctx.lineTo(ctx.canvas.width * 0.1 + ((ctx.canvas.width * 0.9) / this.props.select.length) * i, ctx.canvas.height * 0.9);
            ctx.stroke()
        }
    }

    componentDidMount() {
        this.drawInitialCanvas()
    }

    render() {
        return (
            <div className="main-ladder-view">
                {
                    this.props.select.map((s, k) => (
                        <div className="ladder-view--start" key={k}>
                            <div className="ladder-view--start--pillar">{s['d']['place_name']}</div>
                        </div>
                    ))
                }
                <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight}/>
            </div>
        )
    }

}

export {MainLadderView}