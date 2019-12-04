import React from 'react';
import { url } from '../constants'
import { request } from 'graphql-request'

export default function Login(props) {
  const [login, setLogin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, showError] = React.useState(null)

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

    request( url, query, {
      l: login,
      p: password
    }).then(user => {
      if(user.login) {
        localStorage.auth = user.login
        props.logIn()
      } else {
        showError('Wrong Login or Password')
      }
    })

  }

  return (
      <div className="login">
        <header className="login__header">
          { error ?
              <span>{error}</span> :
              <span>Please, login</span> }
        </header>
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
  );
}
