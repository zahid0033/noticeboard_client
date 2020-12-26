import './App.css';
import { Switch } from 'react-router-dom';
import RouteBody from "./router";

function App() {
  return (
    <>
      <Switch>
        <RouteBody />
      </Switch>
    </>
  );
}

export default App;
