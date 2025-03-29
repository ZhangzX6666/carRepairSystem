import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import theme from './theme/theme';
import Order from './pages/Order/Order';
import Performance from './pages/Performance/Performance';
import Members from './pages/Members/Members';
import Finance from './pages/Finance/Finance';
import Inventory from './pages/Inventory/Inventory';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/members" element={<Members />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;