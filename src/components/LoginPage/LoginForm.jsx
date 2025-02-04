import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Button, Alert } from '../Shared';
import { Eye, EyeOff } from 'lucide-react';
import firebase from '../../firebaseConfig';

const LoginForm = (props) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState(null); // Add state for login error
  const navigateTo = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const email = evt.target.email.value;
      const password = evt.target.password.value;

      await firebase.auth().signInWithEmailAndPassword(email, password);

      navigateTo('/beta');
    } catch (error) {
      if (error.message === "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).") {
        setLoginError("There is not a user with that email.")
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        setLoginError("Invalid password.")
      } else if (error.message === "Firebase: Error (auth/user-not-found).") {
        setLoginError("There is not a user with those credentials.")
      } else {
        setLoginError(error.message)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <TextInput fieldName="email" placeholder="Email" type="email" required />
        <div className="relative">
          <TextInput
            fieldName="password"
            placeholder="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setPasswordVisible((prevState) => !prevState);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isPasswordVisible ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>
      <Button type="submit" primary>
        Log In
      </Button>
      {loginError && (
        <Alert schema="error" title="Failed to Log In.">
          {loginError}
        </Alert>
      )}
    </form>
  );
};

export default LoginForm;
