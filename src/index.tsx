import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import store from './redux/store';
import './index.css';
import App from './App';
import 'modern-normalize/modern-normalize.css';
// import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <BrowserRouter>
        {/* <ChakraProvider> */}
        <App />
        {/* </ChakraProvider> */}
      </BrowserRouter>
    </PersistGate>
  </Provider>,

  document.getElementById('root'),
);
