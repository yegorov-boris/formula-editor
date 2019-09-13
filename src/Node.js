import React from 'react'
import PropTypes from 'prop-types'
import canvg from 'canvg'
import { saveAs } from 'file-saver'

class Node extends React.Component {
    clear() {
        const {MathJax} = window;
        if (!this.script) {
            return
        }

        const jax = MathJax.Hub.getJaxFor(this.script);
        if (jax) {
            jax.Remove()
        }
    }

    typeset(text) {
        const {MathJax} = window;
        if (!MathJax) {
            throw Error("Could not find MathJax while attempting typeset! Probably MathJax script hasn't been loaded")
        }

        this.clear();
        this.setScriptText(text);
        MathJax.Hub.Queue(
            MathJax.Hub.Reprocess(this.script, function() {})
        );
    }

    setScriptText(text) {
        if (!this.script) {
            this.script = document.createElement('script');
            this.script.type = 'math/tex; mode=SVG';
            this.refs.node.appendChild(this.script)
        }

        const content = "\\displaystyle{" + text + "}";
        if ('text' in this.script) {
            // IE8, etc
            this.script.text = content
        } else {
            this.script.textContent = content
        }
    }

    updateMath(text) {
        const {MathJax} = window;
        MathJax.Hub.Config({
            tex2jax: {
                inlineMath: [["$","$"],["\\(","\\)"]]
            },
            extensions: ["tex2jax.js", "TeX/AMSmath.js"],
            jax: ["input/TeX", "output/SVG"],
            SVG: {
                scale: 120
            },
        });
        this.typeset(text);
        // const math = MathJax.Hub.getAllJax("MathOutput")[0];
        // math.outputJax = 'SVG';
        // MathJax.Hub.queue.Push([
        //     "Text",
        //     math,
        //     "\\displaystyle{" + tex + "}"
        // ]);
    }

    saveJpeg() {
        const svg = document.getElementById("foo").innerHTML.trim();
        const canvas = document.createElement('canvas');
        canvg(canvas, svg);
        canvas.toBlob(function(blob) {
            saveAs(blob, Date.now() + ".jpg");
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

export default Node
