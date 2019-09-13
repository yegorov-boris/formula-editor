import React from 'react';
import './App.css';
import Context from './Context'
import Node from './Node'

function App() {
    const options = {
        tex2jax: {
            inlineMath: [["$","$"],["\\(","\\)"]]
        },
        extensions: ["tex2jax.js", "TeX/AMSmath.js"],
        jax: ["input/TeX", "output/SVG"],
    };

  return (
    <div className="App">
        <div id="foo">
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
                Sorry, your browser does not support inline SVG.
            </svg>
        </div>
        <div>
            <Context input='tex' options={options}>
                <div>
                    <Node />
                </div>
            </Context>
        </div>
    </div>
  );
}

export default App;
