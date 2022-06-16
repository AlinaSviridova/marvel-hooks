import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App'; 
import './style/style.scss';

// чтобы работать с джес классами нужно создать экземпляр - потомок
 
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

