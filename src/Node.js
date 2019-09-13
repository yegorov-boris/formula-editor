import React from 'react'
import PropTypes from 'prop-types'
import canvg from 'canvg'
import { saveAs } from 'file-saver'

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.node = React.createRef()
    }

    componentDidMount() {
        this.renderMath()
    }

    componentDidUpdate() {
        this.renderMath()
    }

    renderMath() {
        const { MathJax } = this.context;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.node.current]);
    }

    updateMath(tex) {
        const { MathJax } = this.context;
        if (!MathJax) {
            throw Error("Could not find MathJax while attempting typeset! Probably MathJax script hasn't been loaded or MathJax.Context is not in the hierarchy")
        }

        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.node.current]);
        var math = MathJax.Hub.getAllJax("MathOutput")[0];
        MathJax.Hub.queue.Push([
            "Text",
            math,
            "\\displaystyle{" + tex + "}"
        ]);
    }

    saveJpeg() {
        const svg = document.getElementById("foo").innerHTML.trim();
        const canvas = document.createElement('canvas');
        canvg(canvas, svg);
        canvas.toBlob(function(blob) {
            saveAs(blob, "pretty-image.jpg");
        });
    }

    render() {
        return (
            <div>
                <div ref="node" className="Text">
                    <input
                        id="MathInput"
                        size="50"
                        onChange={event => this.updateMath(event.target.value)}
                    />
                </div>
                <div id="MathOutput">
                    You typed: ${}$
                </div>
                <div class="Save">
                    <button onClick={() => this.saveJpeg()}>save as jpeg</button>
                </div>
            </div>
        )
    }
}

Node.propTypes = {
    children: PropTypes.node.isRequired,
};

Node.contextTypes = {
    MathJax: PropTypes.object,
};

export default Node
