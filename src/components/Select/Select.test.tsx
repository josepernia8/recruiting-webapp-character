import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '.';

describe('Select Component', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];

  test('renders select with options', () => {
    render(
      <Select>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </Select>
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  test('renders with label when provided', () => {
    render(
      <Select label="Test Label">
        <option value="1">Option 1</option>
      </Select>
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('applies correct variant classes', () => {
    render(
      <Select variant="secondary">
        <option value="1">Option 1</option>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveClass('select-secondary');
  });

  test('handles value changes', async () => {
    const handleChange = jest.fn();
    render(
      <Select onChange={handleChange}>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </Select>
    );

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Option 2');
    expect(handleChange).toHaveBeenCalled();
  });
});
