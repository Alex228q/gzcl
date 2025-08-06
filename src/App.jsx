import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import WorkoutPage from './components/WorkoutPage';
import ProgressPage from './components/ProgressPage';
import NavBar from './components/NavBar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff5722',
    },
    secondary: {
      main: '#2196f3',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
    
          <Route path="/" element={<WorkoutPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;