import type { Character } from "../../../types";
import { Button } from "../../Button";
import { Select } from "../../Select";

interface CharacterControlsProps {
  characters: Character[];
  currentCharacter: string;
  onCharacterChange: (id: string) => void;
  onAddCharacter: () => void;
  onSaveCharacters: () => void;
}

export const CharacterControls = ({
  characters,
  currentCharacter,
  onCharacterChange,
  onAddCharacter,
  onSaveCharacters,
}: CharacterControlsProps) => {
  return (
    <div className="character-controls">
      <Select
        value={currentCharacter}
        onChange={(e) => onCharacterChange(e.target.value)}
        aria-label="Select character"
      >
        {characters.map((character) => (
          <option key={character.id} value={character.id}>
            Character {character.id}
          </option>
        ))}
      </Select>
      <Button onClick={onAddCharacter} aria-label="Add a new character">
        Add Character
      </Button>
      <Button onClick={onSaveCharacters} aria-label="Save all characters">
        Save All Characters
      </Button>
    </div>
  );
};
