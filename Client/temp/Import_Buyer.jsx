import React from 'react';
import ReactDOM from 'react-dom';
import PurchaseService from './PurchaseService';

const App = () => {
  return (
    <div>
      <h1>Welcome to our Service Store</h1>
      <PurchaseService />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
