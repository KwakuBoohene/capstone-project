import React from 'react';
import { render,getByLabelText } from '@testing-library/react';
import App from './App';

test('Check if homepage appears', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Sign up/i);
  expect(linkElement).toBeInTheDocument();
});

