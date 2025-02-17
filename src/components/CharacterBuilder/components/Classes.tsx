import { CLASS_LIST } from '../../../constants';
import { meetsClassRequirements } from '../../../utils';
import type { AttributeScores, Class } from '../../../types';

interface ClassSectionProps {
  attributes: AttributeScores;
  selectedClass: Class | null;
  onSelectClass: (className: Class) => void;
}

export default function Classes({ attributes, selectedClass, onSelectClass }: ClassSectionProps) {
  return (
    <div className="classes-section">
      <h2>Classes</h2>
      {(Object.keys(CLASS_LIST) as Class[]).map(className => (
        <div
          key={className}
          className={`class-item ${meetsClassRequirements(attributes, className) ? 'meets-requirements' : ''}`}
          onClick={() => onSelectClass(className)}
        >
          <h3>{className}</h3>
          {selectedClass === className && (
            <div className="class-requirements">
              <h4>Minimum Requirements:</h4>
              {Object.entries(CLASS_LIST[className]).map(([attr, value]) => (
                <div key={attr}>{attr}: {value}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
