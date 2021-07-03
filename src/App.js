import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SingleProject from "./components/SingleProject";
import Project from "./components/Project";
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Switch>
        <Route component={Home} path='/' exact/>
        <Route component={About} path='/about' />
        <Route component={SingleProject} path='/project/:slug' />
        <Route component={Project} path='/project' />
        {/* <Route component={Project} path='/project' /> */}
      </Switch>
    </BrowserRouter>
  )
}

export default App;
