
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const goToClassComponent = () => {
    navigate('/ClassComponent');
  };
  const goToFunctionalComponent = () => {
    navigate('/FunctionalComponent');
  };

  const headerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: 20,
  };

  const buttonsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  };

  const buttonStyle = {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div className="App">
      <header className="App-header" style={headerStyle}>
        <h1>MainPage</h1>
        <div style={buttonsContainerStyle}>
          <button onClick={goToClassComponent} className="App-link" style={buttonStyle}>
            ClassComponent
          </button>
          <button onClick={goToFunctionalComponent} className="App-link" style={buttonStyle}>
            FunctionalComponent
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
