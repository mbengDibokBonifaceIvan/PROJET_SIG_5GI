'use client';
import { faEye, faEyeSlash, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/Login.module.css';
import SignInBtn from '@/components/SignInBtn';
import AuthLayout from '@/layouts/AuthLayout';

const Login = () => {
  const [name, setName] = useState(''); // Champ pour le nom
  const [role, setRole] = useState('admin'); // État pour le rôle de l'utilisateur
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState(''); // État pour les erreurs de nom
  const [emailRole, setRoleError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const login = async () => {
    resetError(); // Remet à zéro les erreurs à chaque soumission

    if (name.length === 0) {
      setError(true);
      setNameError('Le nom est requis');
    }
    if (password.length === 0) {
      setError(true);
      setPasswordError('Password is required');
    }

    if (name && password) {

        if (password.length < 8) {
          setError(true);
          setPasswordError('Password is too short');
        } else {
          try {
            // const res = await fetch(`http://localhost:8080/utilisateurs/verify`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     name, // Ajout du nom
            //     password
            //   })
            // });
            // const res = await fetch(`http://localhost:8080/utilisateurs/login?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`, {
            //   method: 'GET',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   }
            // });
          const res = await fetch(`http://localhost:8080/utilisateurs/verify?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Logger la réponse du backend
        console.log("Response Status:", res.status);

        if (res.ok) {
            const userData = await res.json(); // Cela sera maintenant un objet JSON
            console.log("User Data:", userData); // Logger les données utilisateur

            // Rediriger en fonction du rôle
            if (userData.role === 'admin') {
                window.location.href = '/admin';
            } else if (userData.role === 'scrutateur') {
                window.location.href = '/scrutateur';
            } else {
                console.log("Unknown role:", userData.role);
            }
        }else {
              setError(true);
              setPasswordError('Nom ou mot de passe incorrect');
            }
          } catch (error) {
            setError(true);
            setPasswordError('Essayez encore');
            console.log(error);
          }
         }
    }
  };

  const resetError = () => {
    setError(false);
    setNameError('');
    setPasswordError('');
  };

  useEffect(() => {
    resetError();
  }, []);

  return (
    <AuthLayout title="login Page">
      <div className={styles.loginForm}>
        <div className='flex text-center'>
        <h1 className="font-bold text-center ml-auto text-xl">Se connecter</h1>
        <a href="/" className="ml-auto"> <FontAwesomeIcon icon={faHome} /></a>
        </div>
        <div className="w-full flex flex-col space-y-4 items-center mt-2 h-60">
          {/* Champ pour le nom */}
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
          
           {/* Boutons radio pour le rôle */}
           <div className={styles.loginField}>
            <label className="mr-4">
              <input
                type="radio"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              admin
            </label>
            <label>
              <input
                type="radio"
                value="scrutateur"
                checked={role === 'scrutateur'}
                onChange={() => setRole('scrutateur')}
              />
              scrutateur
            </label>
          </div>


          {/* Champ pour le mot de passe */}
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
            <Link href="/register" className={styles.allez}>
              Créer un compte
            </Link>
          </div>
          
          <div>
            <button className="w-32 h-8 bg-blue-600 rounded capitalize" onClick={login}>
              <span className="w-full text-white text-lg">Connexion</span>
            </button>
          </div>
          
          <SignInBtn />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;