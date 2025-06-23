// Test utilities and helpers
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Custom render function with providers
export function renderWithProviders(ui, options = {}) {
  return render(ui, options);
}

// Mock data for tests
export const mockData = {
  tickets: [
    {
      id: 'TICKET-001',
      title: 'Test Ticket',
      status: 'Not Started',
      priority: 'High'
    }
  ],
  stories: [
    {
      id: 'STORY-001',
      title: 'Test Story',
      status: 'Not Started',
      priority: 'Medium'
    }
  ]
};

// Common test utilities
export const testUtils = {
  waitForElement: (selector) => screen.findByTestId(selector),
  clickElement: async (element) => userEvent.click(element),
  typeText: async (element, text) => userEvent.type(element, text)
}; 