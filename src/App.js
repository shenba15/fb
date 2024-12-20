import './App.css';
import Routing from './Component/Routing.js';
import Store from './Component/Store.js'
import { Provider } from 'react-redux';

function App() {
  return (
    <div>
      <Provider store={Store}>
        <Routing/>
      </Provider>
    </div>
  )
}

export default App;
