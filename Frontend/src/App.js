import './App.css';
import AppRoutes from './Routes/AppRoutes';
import { Provider } from "react-redux";
import { store } from "../src/Redux/Store.js";



function App() {

  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
