import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'
import { TextInput, Button, Alert } from '../Shared';
// import firebase from '../../firebaseConfig';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { doc, getDoc } from 'firebase/firestore';
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
//import { getFirestore } from 'firebase/firestore';
// import db from '../../firestoreConfig.js'
// const userRef = db.collection('users')

const RegisterForm = (props) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [signedUp, setSignedUp] = useState(false);
  const auth = getAuth();

  const navigateTo = useNavigate();
  const submitButtonRef = useRef();

  useEffect(() => {
    if (signedUp) {
      navigateTo('/login');
    }
  })

  const handleSubmit = async (evt) => {
      evt.preventDefault();
      const username = evt.target.username.value;
      const email = evt.target.email.value
      const password = evt.target.password.value;
      const conpass = evt.target.confirmpassword.value;

      if (password !== conpass) {
        setErrorMessage("Passwords do not match.");
        return;
      }
      /*
      const usernameCheck = await userRef.where('username', '==', {username}).get()
      if (!usernameCheck.empty) {
        setErrorMessage("This username is already taken.");
        return;
      }*/


      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username
        }).catch((error) => {
          setErrorMessage(error.message)
        })
        setSuccessMessage("Your profile has been created.")

        setTimeout(() => {
          setSignedUp(true);
        }, 2000) // wait two seconds before redirecting to /login
      })
      .catch((error) => {
        if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
          setErrorMessage("Password should be at least 6 characters.")
        } else if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setErrorMessage("That email is already in use by another user.")
        } else {
          setErrorMessage(error.message)
        }
      });
    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <TextInput fieldName="username" placeholder="Username" type="text" required />
        <TextInput fieldName="email" placeholder="Email" type="email" required />
        <div className="relative">
          <TextInput
            fieldName="password"
            placeholder="Password"
            type={isPasswordVisible ? "text" : "password"}
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setPasswordVisible(prevState => !prevState);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isPasswordVisible ? <Eye /> : <EyeOff />}
          </button>
        </div>

        <div className="relative">
          <TextInput
            fieldName="confirmpassword"
            placeholder="Confirm Password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            required
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                submitButtonRef.current.click();
              }
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setConfirmPasswordVisible(prevState => !prevState);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isConfirmPasswordVisible ? <Eye /> : <EyeOff />}
          </button>
        </div>
        <Button type="submit">
          Sign Up
        </Button>
        {errorMessage && (
          <Alert schema="error" title="Registration Failed">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert schema="success" title="Registration Successful">
            {successMessage}
          </Alert>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;
