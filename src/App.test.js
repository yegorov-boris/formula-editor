import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import App from './App'

it('renders without crashing', done => {
    const wrapper = document.createElement('div');
    ReactDOM.render(
        <App />,
        wrapper
    );
    const input = wrapper.querySelector('#MathInput');
    TestUtils.Simulate.change(input, { target: { value: 'x' } });
    const button = wrapper.querySelector('#SaveJpeg');
    TestUtils.Simulate.click(button);
    setTimeout(done, 100);
});
