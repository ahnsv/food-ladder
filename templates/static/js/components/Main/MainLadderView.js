import React from 'react'

class MainLadderView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'ready'
        };
        this.stepcoords = {
            starting_points: [],
            ending_points: [],
            step_points: []
        };
        this.route = []
    }

    _findNext(x, y) {
        // check if it is in align with any of starting points
        // if it is, it should go down
        if (this.stepcoords.step_points.filter(p => p['x'] === x || p['to']['x'] === x)
            .filter(p => p['y'] > y).length === 0) {
            return
        }
        const target = this.stepcoords.step_points.filter(p => p['to']['x'] === x);
        const src = this.stepcoords.step_points.filter(p => p['x'] === x);
        const next = this.stepcoords.step_points.filter(p => p['x'] === x || p['to']['x'] === x)
            .filter(p => p['y'] > y)
            .reduce((prev, curr) => (curr['y'] - y < prev['y'] - y) ? curr : prev);
        if (target.filter(t => JSON.stringify(t) === JSON.stringify(next))) {
            this.route.push({x: next['to']['x'], y: next['to']['y']});
            return this._findNext(next['x'], next['y'])
        }
        this.route.push({x: next['x'], y: next['y']});
        return this._findNext(next['to']['x'], next['to']['y'])
    }

    traceLadder(e, ctx) {
        const target = parseInt(e.target.innerHTML);
        const start = this.stepcoords.starting_points[target];
        this.route.push(start);
        //    TODO: find next
        this._findNext(start['x'], start['y']);
        //    TODO: draw the trace
        //    TODO: let user know its the end
        alert(`${this.props.select[this.stepcoords.starting_points.map(d => d['x']).indexOf(this.route.pop()['x'])]['d']['place_name']} ㄱㄱㄱㄱㄱㄱㄱ`)
    }

    updateCanvas(e) {
        const self = this;
        const ctx = this.refs.canvas.getContext('2d');
        const l = this.props.select.length;
        const num_of_steps = l * 2;
        const base = ctx.canvas.height * 0.90;
        const width = ctx.canvas.width;
        const stepWidth = width / l;
        const xs = this.stepcoords.starting_points.map(s => s['x']);
        const ys = Array.from({length: num_of_steps}, () => Math.random() * base);
        const directions = ['right', 'left'];
        const step_points = ys.map(y => {
            const x = xs[Math.floor(Math.random() * xs.length)];
            if (x === self.stepcoords.starting_points[0]['x']) {
                return ({x: x, y: y, to: {x: x + stepWidth, y: y}})
            } else if (x === self.stepcoords.starting_points[l - 1]['x']) {
                return ({x: x, y: y, to: {x: x - stepWidth, y: y}})
            }
            return ({
                x: x,
                y: y,
                to: (directions[Math.floor(Math.random() * 2)] === 'right') ? {
                    x: x + stepWidth,
                    y: y
                } : {x: x - stepWidth, y: y}
            })
        });
        this.stepcoords.step_points = step_points;
        for (let i of this.stepcoords.step_points) {
            ctx.beginPath();
            ctx.moveTo(i['x'], i['y']);
            ctx.lineTo(i['to']['x'], i['to']['y']);
            ctx.stroke()
        }
        this.traceLadder(e, ctx)
    }

    drawInitialCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        const l = this.props.select.length;
        const starts = [];
        for (let i = 0; i < l; i++) {
            const start = (ctx.canvas.width / (l * 2)) + (((ctx.canvas.width / l) * i));
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.moveTo(start, 0);
            ctx.lineTo(start, ctx.canvas.height);
            ctx.strokeStyle = '#f0f1ec';
            ctx.stroke();
            starts.push(start)
        }
        const starting_points = starts.map(s => ({x: s, y: 0}));
        const ending_points = starts.map(s => ({x: s, y: ctx.canvas.height}));
        this.stepcoords.starting_points = starting_points;
        this.stepcoords.ending_points = ending_points
    }

    componentDidMount() {
        this.drawInitialCanvas()
    }

    render() {
        return (
            <div className="main-ladder-view">
                <div className="ladder-view--user-pick"
                     style={{gridTemplateColumns: `repeat(${this.props.select.length}, 1fr)`}}>
                    {
                        this.props.select.map((s, k) => (
                            <div className="ladder-view--user-picker" key={k}
                                 onClick={this.updateCanvas.bind(this)}>{k}</div>
                        ))
                    }
                </div>
                <canvas ref="canvas" width={window.innerWidth - 16} height={(window.innerHeight - 16) * 0.75}/>
                <div className="ladder-view--result"
                     style={{gridTemplateColumns: `repeat(${this.props.select.length}, 1fr)`}}>
                    {
                        this.props.select.map((s, k) => (
                            <div className="ladder-view--result--pillar" key={k}>{s['d']['place_name']}</div>
                        ))
                    }
                </div>
            </div>
        )
    }

}

export {MainLadderView}