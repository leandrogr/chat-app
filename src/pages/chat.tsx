import type { NextPage } from 'next'
import { useRouter, Router } from 'next/router'

const Chat: NextPage = () => {

  const router = useRouter()
  const {id} = router.query
  console.log("ID SALA: ", id);

  return (
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-2/1 flex flex-col bg-white shadow-lg overflow-hidden">
            
            <div className="bg-gray-200 text-black text-lg px-6 py-4 flex items-center">
                <a href="/rooms" >
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
                <h3 className="">Chat1</h3>
            </div>
            
            <div className="flex-grow h-96 overflow-y-auto">
                
                {/* <div className="px-6 py-4 border-gray-200">
                    <div className="border rounded-lg p-4 bg-gray-200">
                        Here is a short comment about this employee.
                    </div>
                </div> */}
                <div className="clearfix">
                    <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-3xl rounded-bl-none"><strong>Leandro: </strong>oi</div>
                </div>
                <div className="clearfix">
                    <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2  rounded-3xl rounded-bl-none"><strong>Leandro: </strong>tudo bem?</div>
                </div>
                <div className="clearfix">
                    <div className="bg-green-300 float-right w-3/4 mx-4 my-2 p-2 rounded-3xl rounded-br-none clearfix"><strong>Sheila: </strong>Tudo e vc?</div>
                </div>
                    

            </div>

            <div className="bg-gray-200 px-6">
                <div className="flex items-center pt-4 pb-4 px-4">
                    <div className="ml-4">
                        <form action="">
                            <input type="text" name="message" id="message" className="px-2 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            <button className="w-2/2 px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
      </div>
  )
}

export default Chat
