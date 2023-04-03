import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {

  const emailInputRef = useRef('');
  const passwordInput = useRef('')

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading]= useState(false)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler =(event) =>{
    event.preventDefault();
  
   const  enteredEmail = emailInputRef.current.value;
   const enteredPassword = passwordInput.current.value;
   setIsLoading(true)

   //option : Add valid-ation
   let url;

   if(isLogin){
    url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAn_2OLrhrkgsJBUJI_H9eh62XiqHHR208'
   }else{
    url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAn_2OLrhrkgsJBUJI_H9eh62XiqHHR208'
    
   }
   fetch(url,
    {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers:{
        'Content-Type': 'application/json'
      }
      
    }
    ).then((res)=>{
      setIsLoading(false)
      if(res.ok){

      }else{
        res.json().then(data=>{
          let errorMessage = "Authentication failed!"
          // if(data && data.error && data.error.message){
          //   errorMessage = data.error.message;
          // }
          alert(errorMessage)
          throw new Error(errorMessage)
           
        })
      }
    }).then(data=>{
      console.log(data)
    }).catch((err)=>{alert(err.message)
    })
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInput}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
