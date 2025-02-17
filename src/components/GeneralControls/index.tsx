import { useCharacter } from '../../context/CharacterContext';
import { useToaster } from '../../context/ToasterContext';
import { MessageType } from '../../types';

import { CharacterControls, SkillCheck } from './components';


export default function GeneralControls() {
  const { showMessage } = useToaster();
  const {
    characters,
    currentCharacter,
    currentCharacterData,
    setCurrentCharacter,
    addCharacter,
    saveAllCharacters,
  } = useCharacter();

  const handleSaveCharacters = async () => {
    try {
      await saveAllCharacters();
      showMessage({ content: "All characters saved successfully!", type: MessageType.SUCCESS });
    } catch (error) {
      console.error(error);
      showMessage({ content: "Error saving all characters!", type: MessageType.ERROR });
    }
  };

  return (
    <>
      <CharacterControls
        characters={characters}
        currentCharacter={currentCharacter}
        onCharacterChange={setCurrentCharacter}
        onAddCharacter={addCharacter}
        onSaveCharacters={handleSaveCharacters}
      />
      <SkillCheck
        attributes={currentCharacterData.attributes}
        skills={currentCharacterData.skills}
      />
    </>
  );
}
