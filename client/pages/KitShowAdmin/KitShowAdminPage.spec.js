import React from 'react';
import ReactDOM from 'react-dom';
import KitShowAdminPage from './KitShowAdminPage';

it('should render KitShowAdminPage', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <KitShowAdminPage/>, div);
});
