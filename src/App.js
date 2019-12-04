import React from 'react';
import './App.css';
import Login from './components/login'
import Products from './components/products'



function App() {
  const [isUser, setUser] = React.useState(false);

  const logIn = () => {
    setUser(true)
  }

  return (
    <main className="wrapper">
      <header className="header"> Wellcome to <b>My Shop</b> </header>
      { isUser ?
          <Products /> :
          <Login logIn={logIn}/> }
    </main>
  );
}

export default App;
