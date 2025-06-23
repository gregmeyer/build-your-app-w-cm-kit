import { render, screen } from '@testing-library/react';
import Hello from './Hello';

test('renders greeting message', () => {
  render(<Hello />);
  expect(screen.getByText('Hello, Coffee Money!')).toBeInTheDocument();
}); 