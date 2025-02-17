import { createContext, useContext, useState, useEffect } from 'react';
import type { Character, AttributeScores, Class } from '../types';
import { validateAttributeTotal } from '../utils';

const GITHUB_USERNAME = 'josepernia8';
const API_URL = `https://recruiting.verylongdomaintotestwith.ca/api/{${GITHUB_USERNAME}}/character`;
const DEFAULT_VALUES = {
  attributes: {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  },
  skills: {},
  selectedClass: null,
}

interface CharacterContextType {
  characters: Character[];
  currentCharacter: string;
  currentCharacterData: Character;
  setCurrentCharacter: (id: string) => void;
  addCharacter: () => void;
  updateCharacterAttribute: (attribute: keyof AttributeScores, newValue: number) => void;
  updateCharacterClass: (className: string) => void;
  updateCharacterSkill: (skillName: string, increment: boolean) => void;
  saveAllCharacters: () => Promise<void>;
}

const CharacterContext = createContext<CharacterContextType | null>(null);

export const CharacterProvider = ({ children }: { children: React.ReactNode }) => {
  const [characters, setCharacters] = useState<Character[]>([{ id: '1', ...DEFAULT_VALUES }]);
  const [currentCharacter, setCurrentCharacter] = useState<string>('1');

  // Fetch characters from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data && Array.isArray(data.body)) {
          setCharacters(data.body);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const currentCharacterData = characters.find(c => c.id === currentCharacter)!;

  /**
   * Add a new character to the list of characters
   * and set it as the current character
   * @returns void
   */
  const addCharacter = () => {
    const newId = (characters.length + 1).toString();

    setCharacters(prev => [...prev, { id: newId, ...DEFAULT_VALUES }]);
    setCurrentCharacter(newId);
  };

  /**
   * Update an attribute of the current character
   * @param attribute - The attribute to update
   * @param newValue - The new value to set for the attribute
   * @returns void
   */
  const updateCharacterAttribute = (attribute: keyof AttributeScores, newValue: number) => {
    setCharacters(prev => prev.map(char => {
      if (char.id === currentCharacter) {
        if (newValue < 0) return char;
        
        const newAttributes = {
          ...char.attributes,
          [attribute]: newValue
        };
        
        if (!validateAttributeTotal(newAttributes)) {
          return char;
        }

        return {
          ...char,
          attributes: newAttributes
        };
      }
      return char;
    }));
  };

  /**
   * Update the selected class of the current character
   * If the same class is selected, it will be unselected (set to null)
   * @param className - The class to set for the current character
   * @returns void
   */
  const updateCharacterClass = (className: Class) => {
    setCharacters(prev => prev.map(char => 
      char.id === currentCharacter 
        ? { ...char, selectedClass: char.selectedClass === className ? null : className }
        : char
    ));
  };

  /**
   * Update a skill of the current character
   * @param skillName - The skill to update
   * @param increment - Whether to increment or decrement the skill points
   * @returns void
   */
  const updateCharacterSkill = (skillName: string, increment: boolean) => {
    setCharacters(prev => prev.map(char => {
      if (char.id === currentCharacter) {
        const currentPoints = char.skills[skillName] || 0;
        const newPoints = currentPoints + (increment ? 1 : -1);

        if (newPoints < 0) return char;

        return {
          ...char,
          skills: {
            ...char.skills,
            [skillName]: newPoints
          }
        };
      }
      return char;
    }));
  };

  /**
   * Save all characters to the API
   * @returns Promise<void>
   */
  const saveAllCharacters = async (): Promise<void> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(characters),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save characters');
      }
    } catch (error) { 
      console.error(error);
      throw error; 
    }
  };

  return (
    <CharacterContext.Provider value={{
      characters,
      currentCharacter,
      currentCharacterData,
      addCharacter,
      saveAllCharacters,
      setCurrentCharacter,
      updateCharacterAttribute,
      updateCharacterClass,
      updateCharacterSkill,
    }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
