import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { FormEvent } from 'react'

import api from '../services/api'
import { setCookie } from '../services/cookies';

const Home: NextPage = () => {

  const router = useRouter();

  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    const email: string = (document.querySelector('#username') as HTMLInputElement).value;
    const password: string = (document.querySelector('#password') as HTMLInputElement).value;

    // const data = {
    //   email,
    //   password,
    // };
    // console.log("USER_FORM: ", data);
    
    const { data }  = await api.post("auth/login", {email, password})
    setCookie('token', data.token)
    router.push('/rooms');
    //console.log("RESPONSE: ", data);
    // try {
    //   //await api.post("users", data)
    // } catch (err) {
    //   alert(
    //     err?.response?.data?.error || 'Houve um problema na criação da sala'
    //   );
    // }
    

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Chat Login</h3>
        <form action="" onSubmit={onSubmit}>
          <div className="mt-4">
            <div className="mt-4">
              <label htmlFor="username">Email</label>
              <input type="text" name="username" id="username" placeholder="Email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
            <div className="mt-4">
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" id="password" placeholder="Senha" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" type="submit">Login</button>
              <a href="#" className="text-sm text-blue-600 hover:underline">Criar Conta</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
