import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; 
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

export default function Authentication() {
  const router = useRouter();
  const [haveAccount, setHaveAccount] = useState(true);
  const [isModerator, setIsModerator] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const handleCredentials = async (e) => {
    e.preventDefault();
    if (haveAccount) {
      if (userCredentials.email.length > 1 && userCredentials.password.length > 1) {
        try {
          const { data } = await axios.post('/api/user/login', {
            email: userCredentials.email,
            password: userCredentials.password,
          });
          localStorage.setItem('token', data.token);
          router.push('/dashboard'); // Redirect to dashboard upon successful login
        } catch (error) {
          console.error(error.response.data.message);
        }
      }
    } else {
      if (userCredentials.password.length >= 8) {
        try {
          await axios.post('/api/user/register', {
            email: userCredentials.email,
            password: userCredentials.password,
            isModerator: isModerator,
          });
          alert('Account created.');
          setHaveAccount(true);
        } catch (error) {
          console.error(error.response.data.message);
        }
      } else {
        alert('Password must be at least 8 characters.');
      }
    }
  };

  return (
    <div className="w-[300px] relative">
      <form onSubmit={handleCredentials} className="flex flex-col w-full h-full mx-auto items-center pt-5 gap-5">
        {haveAccount ? <h1 className="text-xl">Login</h1> : <h1 className="text-xl font-bold">Register</h1>}
        <div className="flex flex-col">
          <p className="font-thin">Email</p>
          <div className="relative flex items-center opacity-50">
            <MdAlternateEmail className="absolute left-2" />
            <input
              placeholder="Type your email"
              type="email"
              value={userCredentials.email}
              onChange={(e) => setUserCredentials((prevCred) => ({ ...prevCred, email: e.target.value }))}
              className="pl-8 outline-none p-2 border-b w-full text-black"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-thin">Password</p>
          <div className="relative flex items-center opacity-50">
            <RiLockPasswordLine className="absolute left-2" />
            <input
              placeholder="Type your password"
              type="password"
              value={userCredentials.password}
              className="pl-8 outline-none p-2 w-full text-black"
              onChange={(e) => setUserCredentials((prevCred) => ({ ...prevCred, password: e.target.value }))}
            />
          </div>
          <div className="border-b border border-slate-200 w-full" />
        </div>
        {!haveAccount && (
          <div className="flex items-center mt-2">
            <label className="mr-2">Register as:</label>
            <select
              value={isModerator}
              onChange={(e) => setIsModerator(e.target.value === 'true')}
              className="border rounded-md px-2 py-1 outline-none"
            >
              <option value="false">User</option>
              <option value="true">Moderator</option>
            </select>
          </div>
        )}
        <button type="submit" className="border rounded-3xl px-3 py-1 bg-slate-700 text-white w-full">
          {haveAccount ? 'Login' : 'Sign Up'}
        </button>
      </form>
      {haveAccount ? (
        <div className="pt-12 flex flex-col items-center gap-9">
          <p className="flex flex-col items-center text-sm">
            You don't have an account?{' '}
            <span onClick={() => setHaveAccount(false)} className="underline cursor-pointer">
              Register
            </span>
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm flex flex-col items-center">
            I have an account!
            <span onClick={() => setHaveAccount(true)} className="underline cursor-pointer">
              Login
            </span>
          </p>
        </>
      )}
    </div>
  );
}
