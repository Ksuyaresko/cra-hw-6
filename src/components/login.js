import React from 'react';
import './App.css';
import { request, GraphQLClient } from 'graphql-request'

const url = 'http://shop-roles.asmer.fs.a-level.com.ua/graphql'

function App() {
  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLoginChange = (e) => {
    setLogin(e.target.value)
  }
  const handlePassChange = (e) => {
    setPassword(e.target.value)
  }

  const authorize = () => {
    const query = `query log($l:String, $p:String){
    login(login:$l, password:$p)
  }`

    request(url, query, {
      l: login,
      p: password
    }).then(user => {
      localStorage.auth = user.login
    })

  }


  return (
    <main className="wrapper">
      <div className="login">
        <header className="login__header">Please, login</header>
        <div className="login__input-box">
          <input
              name="login"
              type="text"
              onChange={handleLoginChange}/>
        </div>
        <div className="login__input-box">
          <input
              name="password"
              type="password"
              onChange={handlePassChange}/>
        </div>
        <div className="login__input-box">
          <div className="login__btn" onClick={authorize}>Log In</div>
        </div>
      </div>
    </main>
  );
}

export default App;
