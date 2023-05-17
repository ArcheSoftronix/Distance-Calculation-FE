import CalculateDistance from './Pages/CalculateDistance';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* create routes and route for navigat page  */}
      <Routes>
        <Route path="/" element={<CalculateDistance />} />
      </Routes>
      {/* close routes and route */}
    </div>
  );
}

export default App;
