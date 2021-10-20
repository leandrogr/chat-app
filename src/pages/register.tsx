import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Link from 'next/link';

import api from '../services/api';

const Register: NextPage = () => {

  console.log("TESTE");

  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("SUBMETEU nome", name);

    const data = {
      name,
      email,
      password,
    };
    console.log("Dados: ", data);

    // setName([]);
    // setEmail([]);
    // setPassword([]);


    try {
      await api.post("users", data)
      setName([]);
      setEmail([]);
      setPassword([]);
      setMessage("Cadastro realizado com sucesso!");
    } catch (err) {
      alert(
        err?.response?.data?.error || 'Houve um problema na criação do usuário'
      );
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Chat Registro</h3>
        <form action="" onSubmit={handleSubmit}>
          {message.length > 0 &&
            <h2>
              {message}
            </h2>
          }
          {message}
          <div className="mt-4">
            <div className="mt-4">
              <label htmlFor="email">Nome</label>
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
            <div className="mt-4">
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Criar Conta</button>
              <span className="text-sm text-blue-600 hover:underline"><Link href="/">Já tem uma conta? Entre</Link></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
