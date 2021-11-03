import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import GalleryPage from './components/GalleryPage';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';

function App() {
  return (
    <Router>
      <div className="app">
        <Route exact path='/' component={HomePage} />
        <Route exact path='/gallery' component={GalleryPage} />
        <Route exact path='/game' component={GamePage} />
      </div>
    </Router>
  );
}

export default App;
