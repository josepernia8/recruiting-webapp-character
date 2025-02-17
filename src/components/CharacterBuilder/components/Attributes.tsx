import { ATTRIBUTE_LIST } from '../../../constants';
import { calculateModifier } from '../../../utils';
import type { AttributeScores } from '../../../types';
import { Button } from '../../Button';

interface AttributeSectionProps {
  attributes: AttributeScores;
  onAttributeChange: (attribute: keyof AttributeScores, increment: boolean) => void;
}

export default function Attributes({ attributes, onAttributeChange }: AttributeSectionProps) {
  return (
    <div className="attributes-section">
      <h2>Attributes</h2>
      {ATTRIBUTE_LIST.map((attr) => (
        <div 
          key={attr} 
          className="attribute-row"
          data-testid={`attribute-row-${attr.toLowerCase()}`}
        >
          <span>
            {attr}: {attributes[attr]}
          </span>
          <span>Modifier: {calculateModifier(attributes[attr])}</span>
          <div className="attribute-controls">
            <Button size="small" onClick={() => onAttributeChange(attr, true)}>+</Button>
            <Button variant="secondary" size="small" onClick={() => onAttributeChange(attr, false)}>-</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
