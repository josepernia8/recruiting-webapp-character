import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster } from '.';
import { MessageType } from '../../types';

describe('Toaster Component', () => {
  const mockMessage = {
    content: 'Test message',
    type: MessageType.SUCCESS
  };

  test('renders message content', () => {
    render(<Toaster message={mockMessage} onClose={() => {}} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('applies correct class based on message type', () => {
    const { rerender } = render(<Toaster message={mockMessage} onClose={() => {}} />);
    expect(screen.getByRole('alert')).toHaveClass('success');

    rerender(
      <Toaster 
        message={{ ...mockMessage, type: MessageType.ERROR }} 
        onClose={() => {}} 
      />
    );
    expect(screen.getByRole('alert')).toHaveClass('error');
  });

  test('calls onClose when close button is clicked', async () => {
    const handleClose = jest.fn();
    render(<Toaster message={mockMessage} onClose={handleClose} />);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
