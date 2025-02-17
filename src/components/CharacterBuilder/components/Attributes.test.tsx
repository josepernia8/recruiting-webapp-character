import { render, screen, fireEvent, within } from '@testing-library/react';
import { useState } from 'react';
import Attributes from './Attributes';
import { ATTRIBUTE_LIST } from '../../../constants';
import type { AttributeScores } from '../../../types';

// Test wrapper component to manage state
const AttributesWrapper = () => {
  const [attributes, setAttributes] = useState<AttributeScores>({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  });

  const handleAttributeChange = (attribute: keyof AttributeScores, increment: boolean) => {
    setAttributes(prev => ({
      ...prev,
      [attribute]: increment ? prev[attribute] + 1 : prev[attribute] - 1
    }));
  };

  return (
    <Attributes 
      attributes={attributes} 
      onAttributeChange={handleAttributeChange} 
    />
  );
};

describe('Attributes Component', () => {
  const mockAttributes = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  };
  
  const mockOnAttributeChange = jest.fn();

  beforeEach(() => {
    mockOnAttributeChange.mockClear();
  });

  test('renders all attributes', () => {
    render(
      <Attributes 
        attributes={mockAttributes} 
        onAttributeChange={mockOnAttributeChange} 
      />
    );

    expect(screen.getByText('Attributes')).toBeInTheDocument();

    // Check if all attributes are rendered
    ATTRIBUTE_LIST.forEach(attr => {
      expect(screen.getByText(`${attr}: 10`)).toBeInTheDocument();
    });
  });

  test('should increment/decrement an attribute', () => {
    render(
      <Attributes 
        attributes={mockAttributes} 
        onAttributeChange={mockOnAttributeChange} 
      />
    );

    // Test increment button for Strength
    const incrementButton = screen.getAllByText('+')[0];
    fireEvent.click(incrementButton);
    expect(mockOnAttributeChange).toHaveBeenCalledWith('Strength', true);

    // Test decrement button for Strength
    const decrementButton = screen.getAllByText('-')[0];
    fireEvent.click(decrementButton);
    expect(mockOnAttributeChange).toHaveBeenCalledWith('Strength', false);
  });

  test('should actually increment/decrement an attribute value', () => {
    render(<AttributesWrapper />);

    // Get the Strength attribute row using testid
    const strengthRow = within(screen.getByTestId('attribute-row-strength'));

    // Initial value check
    expect(strengthRow.getByText('Strength: 10')).toBeInTheDocument();
    expect(strengthRow.getByText('Modifier: 0')).toBeInTheDocument();

    // Test increment
    const incrementButton = strengthRow.getByText('+');
    fireEvent.click(incrementButton);
    expect(strengthRow.getByText('Strength: 11')).toBeInTheDocument();
    expect(strengthRow.getByText('Modifier: 0')).toBeInTheDocument();

    // Test decrement
    const decrementButton = strengthRow.getByText('-');
    fireEvent.click(decrementButton);
    expect(strengthRow.getByText('Strength: 10')).toBeInTheDocument();
    expect(strengthRow.getByText('Modifier: 0')).toBeInTheDocument();

    // Test multiple increments to verify modifier change
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(strengthRow.getByText('Strength: 12')).toBeInTheDocument();
    expect(strengthRow.getByText('Modifier: 1')).toBeInTheDocument();
  });
});
