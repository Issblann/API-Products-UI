import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Login } from './components/Login';
import { Register } from './components/SignUp';
import { Home } from './pages/Home';

import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
