import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './katex/katex.min.css';
import katex from './katex/katex';

export default class extends Component {
    static propTypes = {
        math: PropTypes.string,
    };

    static defaultProps = {
        math: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            oldMath: props.math
        }
    }

    componentDidMount() {
        this.renderMath();
    }

    shouldComponentUpdate(nextProps) {
        if (!nextProps.math) return false;
        return nextProps.math !== this.state.oldMath
    }

    componentDidUpdate() {
        this.renderMath();
    }

    renderMath() {
        katex.render(this.props.math, this.preview);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({oldMath: nextProps.math})
    }

    render() {
        return (
            <div
                id='react-mathjax-preview'
                ref={(node) => {this.preview = node}}
            />
        )
    }
}
