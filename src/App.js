import React from 'react';
import './App.css';
import Node from './Node'

function App() {
  return (
    <div className="App">
        <div id="foo">
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
                Sorry, your browser does not support inline SVG.
            </svg>
        </div>
        <div>
            <Node />
        </div>
    </div>
  );
}

export default App;
