import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects'

import Container from './components/layout/Container'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
        <NavBar/>
      <Container customClass="minHeight">
      <Routes>
        <Route exact path='/' element={<Home />} ></Route>
      </Routes>
      <Routes>
        <Route exact path='/company' element={<Company />}></Route>
      </Routes>
      <Routes>
        <Route exact path='/contact' element={<Contact />}></Route>
      </Routes>
      <Routes>
        <Route exact path='/newproject' element={<NewProject />}></Route>
      </Routes>
      <Routes>
        <Route exact path='/projects' element={<Projects />}></Route>
      </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
