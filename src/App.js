import React, {Component} from 'react';
import './App.css';
import MathJax from './MathJax'
import canvg from 'canvg'
import { saveAs } from 'file-saver'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            math: '$${-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({target}) {
        const v = target.value;
        this.setState(() => ({math: v}))
    }

    saveJpeg() {
        const svg = document
            .getElementsByClassName('MathJax_SVG')[0]
            .innerHTML.trim();
        const canvas = document.createElement('canvas');
        canvg(canvas, svg);
        canvas.toBlob(function(blob) {
            saveAs(blob, Date.now() + ".jpg");
        });
    }

    render() {
        return (
            <div className="App">
                <div ref="node" className="Text">
                    <input
                        id="MathInput"
                        size="50"
                        onChange={this.handleChange}
                    />
                </div>
                <div className="Save">
                    <button onClick={() => this.saveJpeg()}>save as jpeg</button>
                </div>
                <div>
                    <MathJax math={this.state.math} />
                </div>
            </div>
        );
    }
}

export default App;
