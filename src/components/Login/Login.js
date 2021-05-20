import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {

  if(action.type === 'USER_INPUT') {
    return ({value: action.value, isValid: action.value.includes('@')});
  }
  if(action.type === 'INPUT_BLUR') {
    return ({value: state.value, isValid: state.value.includes('@')});
  }
  
}

const passwordReducer = (state, action) => {

  if(action.type === 'USER_INPUT') {
    return ({value: action.value, isValid: action.value.trim().length > 6});
  }
  if(action.type === 'INPUT_BLUR') {
    return ({value: state.value, isValid: state.value.trim().length > 6});
  }
  
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: false});

  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    // setFormIsValid(
    //   event.target.value.includes('@') && enteredPassword.trim().length > 6
    // );

    dispatchEmail({type: 'USER_INPUT', value: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    // setFormIsValid(
    //   emailState.value.includes('@') && event.target.value.trim().length > 6
    // );

    dispatchPassword({type: 'USER_INPUT', value: event.target.value});
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes('@'));
    dispatchEmail({type: 'INPUT_BLUR'});

  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});

  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!passwordState.isValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
