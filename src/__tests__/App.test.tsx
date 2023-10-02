import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders app successfully', () => {
  render(<App />);
  const homePageHeading = screen.getByText(/Homepage/i);
  expect(homePageHeading).toBeInTheDocument();
});
