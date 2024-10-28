import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './auth/Login';
import Register_1 from './auth/Register_1';
import Register_2 from './auth/Register_2';
import Register_3 from './auth/Register_3';
import Register_4 from './auth/Register_4';
import SamplePage from './pages/SamplePage';

export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register/details-track-1' element={<Register_1 />} />
        <Route path='/register/details-track-2' element={<Register_2 />} />
        <Route path='/register/details-track-3' element={<Register_3 />} />
        <Route path='/register/details-track-4' element={<Register_4 />} />
        <Route path='/sample' element={<SamplePage />} />
      </Routes>

    </BrowserRouter>
  )
}
