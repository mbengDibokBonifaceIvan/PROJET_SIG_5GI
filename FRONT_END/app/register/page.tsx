'use client';
import { faEye, faEyeSlash, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Login.module.css';
import Link from 'next/link';
import AuthLayout from '@/layouts/AuthLayout';
import SignInBtn from '@/components/SignInBtn';

type ChildProps = {};

const Register = () => {
  const [name, setName] = useState(''); // Champ pour le nom
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(''); // État pour les erreurs de nom
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const login = async () => {
    if (name.length === 0) {
      setError(true);
      setNameError('Le nom est requis');
    }
    if (email.length === 0) {
      setError(true);
      setEmailError('Email is required');
    }
    if (password.length === 0) {
      setError(true);
      setPasswordError('Password is required');
    }
    if (name && email && password) {
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(mailformat)) {
        if (password.length < 8) {
          setError(true);
          setPasswordError('Password is too short');
        } else {
          if (password.length >= 8) {
            try {
              const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name, // Ajout du nom
                  email,
                  password
                })
              });
              if (res.status === 400) {
                setError(true);
                setEmailError('This email is already in registered');
              }
              if (res.status === 200) {
                const destination = window.location.origin;
                window.location.href = `${destination}/login`;
              }
            } catch (error) {
              setError(true);
              setEmailError('try again');
              setPasswordError('try again');
              console.log(error);
            }
          } else {
            setError(true);
            setEmailError('incorrect email address');
            setPasswordError('Incorrect password');
          }
        }
      } else {
        setError(true);
        setEmailError('Email is not valid email format');
      }
    }
  };

  const resetError = () => {
    setError(false);
    setEmailError('');
    setPasswordError('');
  };
  useEffect(() => {
    resetError();
  }, []);
  return (
    <AuthLayout title={'Elecam'}>
      <div className={styles.loginForm}>
      <div className='flex text-center'>
        <h1 className="font-bold text-center ml-auto text-xl">REGISTER</h1>
        <a href="/" className="ml-auto"> <FontAwesomeIcon icon={faHome} /></a>
        </div>
        <div className="w-full flex flex-col space-y-4 items-center mt-4 h-64">
        <div className={error ? styles.loginFieldErr : styles.loginField}>
            <input
              type="text"
              placeholder="Nom"
              className="w-full h-8 border outline-none px-3"
              onChange={(e) => setName(e.target.value)}
              onClick={resetError}
            />
            {nameError && <p className="my-1 text-xs">{nameError}</p>}
            {name && <span className="text-xs">Nom</span>}
          </div>
          <div className={error ? styles.loginFieldErr : styles.loginField}>
            <input
              type="text"
              name=""
              placeholder="Email"
              className="w-full h-10 border outline-none px-3"
              onChange={(e) => setEmail(e.target.value)}
              onClick={resetError}
            />
            {emailError && <p className="text-xs">{emailError}</p>}
            {email && <span className="text-xs">Email</span>}
          </div>
          <div className={error ? styles.loginFieldErr : styles.loginField}>
            <input
              type={passwordIsVisible ? 'text' : 'password'}
              name=""
              placeholder="Mot de passe"
              className="w-full h-10 border outline-none px-3"
              onChange={(e) => setPassword(e.target.value)}
              onClick={resetError}
            />
            {passwordError && <p className=" text-xs">{passwordError}</p>}
            {password && <span className="text-xs">Mot de passe</span>}
            {passwordIsVisible && (
              <div className={styles.eye}>
                <FontAwesomeIcon icon={faEye} onClick={() => setPasswordIsVisible(!passwordIsVisible)} />
              </div>
            )}
            {!passwordIsVisible && (
              <div className={styles.eye}>
                <FontAwesomeIcon icon={faEyeSlash} onClick={() => setPasswordIsVisible(!passwordIsVisible)} />
              </div>
            )}
          </div>
          <div className={styles.loginField}>
            <Link href="/login" className={styles.allez}>
              Se connecter avec un compte existant ?
            </Link>
          </div>
          <div>
            <button className="w-32 h-8 bg-blue-600 rounded capitalize" onClick={login}>
              <span className="w-full text-white text-lg">Connexion</span>
            </button>
          </div>
          {/* <div className='text-center block text-blue-500 hover:underline '>-- OU --</div>
           */}
          <SignInBtn />;
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
