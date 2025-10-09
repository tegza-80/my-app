
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const goToClassComponent = () => {
    navigate('/ClassComponent');
  };
    const goToFunctionalComponent = () => {
    navigate('/FunctionalComponent');
  };

  return (
    <div className="App">
      <header className="App-header">
        {
          <p>MainPage</p>
        }
        <button onClick={goToClassComponent} className="App-link">
          ClassComponent
        </button>
        
        <button onClick={goToFunctionalComponent} className="App-link">
          FunctionalComponent
        </button>
      </header>
    </div>
  );
}

export default App;

