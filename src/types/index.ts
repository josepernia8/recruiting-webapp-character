export type Attributes = {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type AttributeScores = Record<keyof Attributes, number>;

export type Skill = {
name: string;
attributeModifier: keyof Attributes;
points: number;
};

export type SkillScores = Record<string, number>;

export type Character = {
id: string;
attributes: AttributeScores;
skills: SkillScores;
selectedClass: Class | null;
};

export enum MessageType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface Message {
  type: MessageType | null;
  content: string;
}
