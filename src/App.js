import React from 'react';
import './App.css';
import Context from './Context'
import Node from './Node'

function App() {
  return (
    <div className="App">
        <div>
            <Context input='tex'>
                <div>
                    <Node />
                </div>
            </Context>
        </div>
    </div>
  );
}

export default App;
