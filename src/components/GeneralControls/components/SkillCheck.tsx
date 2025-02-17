import { useState } from 'react';
import { SKILL_LIST } from '../../../constants';
import { calculateModifier, getTotalSkillValue, rollD20 } from '../../../utils';
import type { AttributeScores, SkillScores } from '../../../types';
import { Button } from '../../Button';
import { Select } from '../../Select';
import { useCharacter } from '../../../context/CharacterContext';

interface SkillCheckProps {
  attributes: AttributeScores;
  skills: SkillScores;
}

interface SkillCheckResult {
  characterName: string;
  skillName: string;
  totalSkill: number;
  roll: number;
  dc: number;
  success: boolean;
}

export const SkillCheck = ({ attributes, skills }: SkillCheckProps) => {
  const [dc, setDc] = useState(20);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const currentSkill = SKILL_LIST.find(s => s.name === selectedSkill)!;
  const { currentCharacter } = useCharacter();
  const [result, setResult] = useState<SkillCheckResult | null>(null);

  const handleRoll = () => {
    const roll = rollD20();
    const skill = SKILL_LIST.find(s => s.name === selectedSkill)!;
    const attrModifier = calculateModifier(attributes[skill.attributeModifier]);
    const skillPoints = skills[selectedSkill] || 0;
    const totalSkill = getTotalSkillValue(skillPoints, attrModifier);
    const totalRoll = roll + totalSkill;

    setResult({
      characterName: currentCharacter,
      skillName: currentSkill.name,
      totalSkill,
      roll: totalRoll,
      dc,
      success: totalRoll >= dc
    });
  };

  return (
    <div className="skill-check-section">
      <h2>Skill Check</h2>
      <div className="skill-check-controls">
        <Select 
          value={selectedSkill} 
          onChange={(e) => setSelectedSkill(e.target.value)}
          variant="secondary"
          aria-label="Select skill to check"
        >
          {SKILL_LIST.map(skill => <option key={skill.name} value={skill.name}>{skill.name}</option>)}
        </Select>
        <input 
          type="number" 
          value={dc}
          onChange={(e) => setDc(Number(e.target.value))}
          min={1}
          placeholder="DC"
          style={{ width: '60px' }}
        />
        <Button 
          variant="secondary"
          onClick={handleRoll}
          aria-label="Roll dice for skill check"
        >
          Roll
        </Button>
      </div>
      <div className={`skill-check-result ${result ? 'visible' : ''}`}>
        {result && (
          <>
            <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>Character: {result.characterName}</p>
            <p style={{ margin: '2px' }}>Skill: {result.skillName}: {result.totalSkill}</p>
            <p style={{ margin: '2px' }}>You Rolled: {result.roll}</p>
            <p style={{ margin: '2px' }}>The DC was: {result.dc}</p>
            <p style={{ margin: '2px' }}>Result: {result.success ? 'Success!' : 'Failure'}</p>
          </>
        )}
      </div>
    </div>
  );
};
