// Providers
import { ToasterProvider } from './context/ToasterContext';
import { CharacterProvider } from './context/CharacterContext';

// Components
import CharacterBuilder from './components/CharacterBuilder';
import GeneralControls from './components/GeneralControls';

// Styles
import './App.css';

function AppContent() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - José Pernía</h1>
      </header>
      <section className="App-section">
        <div className="app-container">
          <GeneralControls />
          <CharacterBuilder />
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <ToasterProvider>
      <CharacterProvider>
        <AppContent />
      </CharacterProvider>
    </ToasterProvider>
  );
}

export default App;
