import type { GetServerSideProps, NextPage } from 'next'
import { useRouter, Router } from 'next/router'
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { parseCookies } from '../services/cookies';
import { getPayload, isTokenExpired } from '../services/auth';
import api from '../services/api';

interface Message {
    id: string;
    name: string;
    text: string;
    room: string;
}

interface Payload {
    name: string;
    text: string;
    room: string;
}

interface PrivatePageProps {
    payload: any;
  }

const socket = io('http://localhost:3333');

const Chat: NextPage<PrivatePageProps> = (props) => {

  const router = useRouter()
  const {id} = router.query
  const room_id = id;
//   console.log("ID SALA: ", id);

  const [title] = useState('Chat Web');
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {

    api.get("rooms/" + room_id)
    .then(res => {
      const {name} = res.data;
      setRoom(name);
    })
    .catch(err => console.log(err))
    
    socket.emit('joinRoom', room);
    
    function receivedMessage(message: Payload) {
        const newMessage: Message = {
            id: uuidv4(),
            name: message.name,
            text: message.text,
            room: message.room,
        }

        setMessages([...messages, newMessage]);
    }

    socket.on('msgToClient', (message: Payload) => {
        receivedMessage(message);
    })

  }, [messages, name, text]);

  function validateInput() {
      return text.length > 0;
  }

  function sendMessage() {
    if (validateInput()) {
        const message: Payload = {
            name,
            text,
            room,
        }

        message.name = props.email;
        message.room = room;
        
        console.log("MENSAGEM A ENVIAR: ", message);

        socket.emit('msgToServer', message);
        setText('');
    }
  }

  function changeRoom() {
    socket.emit('leaveRoom', room);
    setRoom('');
    router.push('/rooms');
  }

  function setLogout() {
    Cookies.remove('token');
    router.push('/');
  }

  return (
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-2/1 flex flex-col bg-white shadow-lg overflow-hidden">
            
            <div className="bg-gray-200 text-black text-lg px-6 py-4 flex items-center">
                <a href="#" onClick={() => {changeRoom()}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 my-1 text-black ml-2"
                >
                    <path
                    className="text-black-100 fill-current"
                    d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
                    />
                </svg>
                </a>
                <h3 className="w-2/2 px-2 py-2 mr-5 mt-4 text-white bg-gray-800 rounded-lg hover:bg-gray-600">{room}</h3>
                <button type="button" className="w-2/2 px-2 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={() => {setLogout()}}>Sair</button>
            </div>
            
            <div className="flex-grow h-96 overflow-y-auto">
                {messages.map(message  => {

                    console.log("MESSAGE NAME: ", message.name)
                    console.log("MESSAGE NAME: ", name)                   

                    if(message.name === name) {
                        return (
                            <div className="clearfix" key={message.id}>
                                <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-3xl rounded-bl-none"><strong>{message.name}: </strong>{message.text}</div>
                            </div>
                        );
                    }

                    return (
                        <div className="clearfix" key={message.id}>
                            <div className="bg-green-300 float-right w-3/4 mx-4 my-2 p-2 rounded-3xl rounded-br-none clearfix"><strong>{message.name}: </strong>{message.text}</div>
                        </div>
                    );

                })}

            </div>

            <div className="bg-gray-200 px-6">
                <div className="flex items-center pt-4 pb-4 px-4">
                    <div className="ml-4">
                        <form action="">
                            <input type="text" name="text" id="text" value={text} onChange={e => setText(e.target.value)} placeholder="Entre com sua mensagem" className="px-2 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            <button className="w-2/2 px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" type="button" onClick={() => {sendMessage()}}>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
      </div>
  )
}

export default Chat

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
  