import { SKILL_LIST } from '../../../constants';
import { calculateModifier, getTotalSkillValue } from '../../../utils';
import type { AttributeScores, SkillScores } from '../../../types';
import { Button } from '../../Button';

interface SkillSectionProps {
  attributes: AttributeScores;
  skills: SkillScores;
  availablePoints: number;
  pointsSpent: number;
  onSkillChange: (skillName: string, increment: boolean) => void;
}

export default function Skills({ attributes, skills, availablePoints, pointsSpent, onSkillChange }: SkillSectionProps) {
  const remainingPoints = availablePoints - pointsSpent;

  return (
    <div className="skills-section">
      <div className="skills-header">
        <h2>Skills</h2>
        <span className="remaining-points">Points Available: {remainingPoints}</span>
      </div>
      {SKILL_LIST.map((skill) => {
        const attrModifier = calculateModifier(attributes[skill.attributeModifier]);
        const skillPoints = skills[skill.name] || 0;
        const total = getTotalSkillValue(skillPoints, attrModifier);

        return (
          <div key={skill.name} className="skill-row">
            <span>
              {skill.name}: {skillPoints}
            </span>
            <div className="skill-controls">
              <Button size="small" onClick={() => onSkillChange(skill.name, true)} disabled={remainingPoints <= 0}>
                +
              </Button>
              <Button
                size="small"
                variant="secondary"
                onClick={() => onSkillChange(skill.name, false)}
                disabled={skillPoints <= 0}
              >
                -
              </Button>
            </div>
            <span>
              {skill.attributeModifier}: {attrModifier}
            </span>
            <span>Tot: {total}</span>
          </div>
        );
      })}
    </div>
  );
};
