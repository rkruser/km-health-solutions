import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../react-components/App_old';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Post text/i);
  expect(linkElement).toBeInTheDocument();
});
