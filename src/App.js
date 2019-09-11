import React from 'react';
import './App.css';
import Context from './Context'
import Node from './Node'

const tex = `f(x) = \\int_{-\\infty}^\\infty\\hat f(\\xi)\\,e^{2 \\pi i \\xi x}\\,d\\xi`

function App() {
  return (
    <div className="App">
        <div>
            <Context input='tex'>
                <div>
                    <Node>{tex}</Node>
                </div>
            </Context>
        </div>
    </div>
  );
}

export default App;
