import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/Sign in/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/Scan/i);
  expect(linkElement).toBeInTheDocument();
});