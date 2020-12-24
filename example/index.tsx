import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactFitty } from '../.';

const App = () => {
  return (
    <div>
        <ReactFitty id='fitty'>Mussum Ipsum, cacilds</ReactFitty>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
