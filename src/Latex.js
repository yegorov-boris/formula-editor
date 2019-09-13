import React from 'react'
import PropTypes from 'prop-types'
import loadScript from 'load-script'

class Latex extends React.Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();
        this.renderMath = this.renderMath.bind(this)
    }

    componentDidMount() {
        loadScript(
            'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=default',
            this.renderMath
        )
    }

    componentDidUpdate() {
        this.renderMath()
    }

    renderMath() {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, this.node.current]);
    }

    render() {
        return <div ref={this.node}>{this.props.children}</div>
    }
}

Node.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Latex
