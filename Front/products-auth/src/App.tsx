import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AuthProvider } from './useContext/authContext';
import { Login } from './components/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" />
          <Route path="/products" />
          <Route path="/login" Component={Login} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
