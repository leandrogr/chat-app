import type { GetServerSideProps, NextPage } from 'next'
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

import api from '../services/api'
import { getPayload, isTokenExpired } from '../services/auth';
import { parseCookies } from '../services/cookies';

interface PrivatePageProps {
  payload: any;
}

const Rooms: NextPage<PrivatePageProps> = (props) => {

  console.log(props.email);

  const [roomsList, setRoomsList] = useState([]);
  const [name, setName] = useState(null);

  const getRooms = () => {
    api.get("rooms")
      .then(res => {
        const roomsList = res.data;
        setRoomsList([...roomsList, roomsList]);
      })
      .catch(err => console.log(err))
  }
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name,
    };

    try {
      await api.post("rooms", data)
      getRooms();
    } catch (err) {
      alert(
        err?.response?.data?.error || 'Houve um problema na criação da sala'
      );
    }
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Chat {props.email}</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-4">
            <div className="mt-4">
              <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sala" className="px-2 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
              <button type="submit" className="px-2 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Criar</button>
            </div>
          </div>
        </form>
        <h3 className="text-2xl font-bold text-center">Lista de Salas</h3>
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
            <div className="md:flex">
                <div className="w-full p-4">
                  <ul>

                    {roomsList?.map((room) => (
                    <li key={room.id} className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                      <button type="button" onClick={() => Router.push({pathname: '/chat', query: {id: room.id}})} >
                        <div className="flex ml-2">
                          <div className="flex flex-col ml-2"><span className="font-medium text-black">{room.name}</span></div>
                        </div>
                        </button>
                    </li>
                    ))}

                  </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Rooms

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const cookies: {} = parseCookies(ctx.req);

  if (!cookies.token || isTokenExpired(cookies.token)) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      }
    }
  }

  const payload = getPayload(cookies.token);

  console.log(cookies);
  return{
    props: payload,
  }
};
