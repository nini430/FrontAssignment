import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import UserTable from './pages/UserTable';
import Navbar from './components/Navbar';
import PieChart from './pages/PieChart';

function App() {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/statistics" element={<PieChart />} />
        </Routes>
      </Wrapper>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem;
`;
