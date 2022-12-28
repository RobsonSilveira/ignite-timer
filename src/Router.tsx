import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts/DefaultLayout';

import { History } from './pages/History/History';
import { Home } from './pages/Home';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/history' element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
