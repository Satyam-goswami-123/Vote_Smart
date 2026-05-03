import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EligibilityPage from '../pages/EligibilityPage';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('EligibilityPage', () => {
  test('renders first question on mount', () => {
    renderWithRouter(<EligibilityPage />);
    expect(screen.getByText('Am I Eligible')).toBeInTheDocument();
    expect(screen.getByText('Are you a citizen of India?')).toBeInTheDocument();
  });

  test('selecting "no" to citizen shows immediate disqualification', () => {
    renderWithRouter(<EligibilityPage />);
    const noButton = screen.getByText('No, I am a foreign national');
    fireEvent.click(noButton);
    expect(screen.getByText('❌ Not Eligible')).toBeInTheDocument();
    expect(screen.getByText('Non-citizens cannot vote in Indian elections.')).toBeInTheDocument();
  });
});
