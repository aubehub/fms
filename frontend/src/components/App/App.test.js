import React from 'react';
import { render } from '@testing-library/react';
 
import App from './App';
 
describe('App', () => {
  const { getByText } = render(<App />);

  test('Links to Home and myShelf', () => {
    const homeLink = getByText("Home");
    expect(homeLink.nodeName).toBe("A");
    expect(homeLink.href).toBe("http://localhost/");

    const myShelfLink = getByText("MyShelf");
    expect(myShelfLink.nodeName).toBe("A");
    expect(myShelfLink.href).toBe("http://localhost/myshelf");
  });
});