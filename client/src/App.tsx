import styled from 'styled-components'

import UserTable from './components/UserTable'
import Navbar from './components/Navbar';

function App() {
  return (
    <Container>
      <Navbar/> 
      <Wrapper> 
     <UserTable/>
      </Wrapper>
    </Container>
  )
}

export default App;

const Container=styled.div`
   width:100%;
`

const Wrapper=styled.div`
   max-width:1440px;
   margin:0 auto;
   padding:1rem;
`
