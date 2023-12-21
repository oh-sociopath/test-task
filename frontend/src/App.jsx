import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home-page/home-page.jsx';
import { Account } from './pages/account/account.jsx';
import { UserContext } from './context/user-context.js';
import { People } from './pages/people/People.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/people' element={<People />} />
        { user &&  <Route path='/account' element={<Account />} />}
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
