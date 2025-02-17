import type { AttributeScores, Class } from "../types";
import { CLASS_LIST } from "../constants";

/**
 * Calculates the modifier for a given value.
 * @param value - The value to calculate the modifier for.
 * @returns The calculated modifier.
 */
export const calculateModifier = (value: number): number => {
    return Math.floor((value - 10) / 2);
};

/**
 * Checks if the character meets the requirements for a given class.
 * @param scores - The attribute scores of the character.
 * @param className - The class to check the requirements for.
 * @returns Whether the character meets the requirements for the class.
 */
export const meetsClassRequirements = (scores: AttributeScores, className: Class): boolean => {
    const requirements = CLASS_LIST[className];

    return Object.entries(requirements).every(
        ([attr, min]) => scores[attr as keyof AttributeScores] >= min
    );
};

/**
 * Calculates the skill points based on intelligence modifier.
 * @param intelligenceModifier - The modifier derived from the character's intelligence score.
 * @returns The total skill points available for the character.
 */
export const calculateSkillPoints = (intelligenceModifier: number): number => {
  return 10 + (4 * intelligenceModifier);
};

/**
 * Calculates the total skill value based on points and the attribute modifier.
 * @param points - The points assigned to the skill.
 * @param attributeModifier - The modifier derived from the character's related attribute.
 * @returns The total skill value.
 */
export const getTotalSkillValue = (points: number, attributeModifier: number): number => {
  return points + attributeModifier;
};

/**
 * Validates the total attribute score to ensure it does not exceed the maximum limit.
 * @param attributes - The attribute scores of the character.
 * @returns Whether the total attribute score is valid.
 */
export const validateAttributeTotal = (attributes: AttributeScores): boolean => {
  const total = Object.values(attributes).reduce((sum, value) => sum + value, 0);
  return total <= 70;
};

/**
 * Rolls a twenty-sided die and returns the result.
 * @returns A random number between 1 and 20.
 */
export const rollD20 = (): number => {
  return Math.floor(Math.random() * 20) + 1;
};
