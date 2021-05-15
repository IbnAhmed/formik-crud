import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/home";
import NotFound from "./pages/not-found/not-found";
import AddTax from './pages/add-tax/add-tax';
import EditTax from './pages/edit-tax/edit-tax';

function App() {
  return (
    <Router>
      <div className="max-w-7xl mx-auto px-4 sm:px-6  border border-gray-200 m-6">
        <Switch>
          <Route path="/not-found">
            <NotFound />
          </Route>
          <Route path="/add-tax" >
            <AddTax />
          </Route>
          <Route path="/edit-tax/:id" >
            <EditTax />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route>
            <Redirect to="/not-found" />
            {/* <NotFound /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
