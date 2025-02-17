import { useCharacter } from '../../context/CharacterContext';
import { useToaster } from '../../context/ToasterContext';
import { AttributeScores, MessageType } from '../../types';
import { calculateModifier, calculateSkillPoints, validateAttributeTotal } from '../../utils';

import { Attributes, Classes, Skills } from './components';

export default function CharacterBuilder() {
  const { showMessage } = useToaster();
  const {
    currentCharacterData,
    updateCharacterAttribute,
    updateCharacterClass,
    updateCharacterSkill,
  } = useCharacter();

  // Calculate total spent skill points
  const spentSkillPoints = Object.values(currentCharacterData.skills)
    .reduce((sum, points) => sum + (points || 0), 0);

  // Calculate available skill points
  const availableSkillPoints = calculateSkillPoints(
    calculateModifier(currentCharacterData.attributes.Intelligence)
  );

  /**
   *  Update an attribute of the current character
   * @param attribute - The attribute to update
   * @param increment - Indicates whether to increase or decrease the attribute
   */
  const handleAttributeChange = (attribute: keyof AttributeScores, increment: boolean) => {
    const currentAttributes = currentCharacterData.attributes;
    const newValue = currentAttributes[attribute] + (increment ? 1 : -1);

    const newAttributes = {
      ...currentAttributes,
      [attribute]: newValue
    };
    
    if (!validateAttributeTotal(newAttributes)) {
      showMessage({ content: 'Total attribute points cannot exceed 70', type: MessageType.ERROR });
      return;
    }

    updateCharacterAttribute(attribute, newValue);
  };

  /**
   * Handle skill point changes for the specified skill.
   * @param skillName - The name of the skill to update
   * @param increment - Indicates whether to increase or decrease the skill points
   * @returns void
   */
  const handleSkillChange = (skillName: string, increment: boolean) => {
    const newPoints = (currentCharacterData.skills[skillName] || 0) + (increment ? 1 : -1);

    if (newPoints < 0) {
      showMessage({ content: "Cannot reduce skill points below 0", type: MessageType.ERROR });
      return;
    }

    if (increment && spentSkillPoints >= availableSkillPoints) {
      showMessage({ content: "No more skill points available", type: MessageType.ERROR });
      return;
    }

    updateCharacterSkill(skillName, increment);
  };

  return (
    <div className="character-builder-container">
      <Attributes 
        attributes={currentCharacterData.attributes}
        onAttributeChange={handleAttributeChange}
      />
      <Classes
        attributes={currentCharacterData.attributes}
        selectedClass={currentCharacterData.selectedClass}
        onSelectClass={updateCharacterClass}
      />
      <Skills
        attributes={currentCharacterData.attributes}
        skills={currentCharacterData.skills}
        onSkillChange={handleSkillChange}
        availablePoints={availableSkillPoints}
        pointsSpent={spentSkillPoints}
      />
    </div>
  );
}
