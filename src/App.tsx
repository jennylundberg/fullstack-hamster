import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import GalleryPage from './components/GalleryPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="app">
        <Route exact path='/' component={HomePage} />
        <Route exact path='/gallery' component={GalleryPage} />
      </div>
    </Router>
  );
}

export default App;
