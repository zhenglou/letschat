import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../src/components/Button'; // 使用 Webpack 别名

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
    screen.debug()
  });
});