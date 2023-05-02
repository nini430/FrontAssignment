import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Container>
      <Link to="/">User Information Database</Link>
      <Link to="/statistics">Statistics</Link>
    </Container>
  );
};

const Container = styled.div`
  height: 60px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.7);
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  gap: 2rem;
`;

export default Navbar;
