import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { UserContext, UserContextProvider } from './useContext/userContext';
import { Login } from './components/Login';
import { Register } from './components/SignUp';
import { Home } from './pages/Home';
import { ProductsPage } from './pages/Products';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/products" Component={ProductsPage} />
          <Route path="/login" Component={Login} />
          <Route path="/signUp" Component={Register} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
