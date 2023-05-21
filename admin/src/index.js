import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { MovieContextProvider } from './context/movieContext/MovieContext';
import { ListContextProvider } from './context/listContext/ListContext';
import { UserContextProvider } from './context/userContext/UserContext';

//global.proxy = "//192.168.56.1:8000/api/"
gloabal.proxy = "https://alpacabox.onrender.com/api/"

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <MovieContextProvider>
          <ListContextProvider>
            <App />
          </ListContextProvider>
        </MovieContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
