
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Carousel from './Carousel';
function App () {


    return (
      <div className="App">
       <Carousel />
      </div>
    );
  
}

ReactDOM.render(<App />, document.getElementById('app'))
