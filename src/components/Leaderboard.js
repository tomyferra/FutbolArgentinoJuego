import { React, useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import afaLogo from '../images/afa.webp';
import BounceLoader from "react-spinners/BounceLoader";
import Footer from './Footer';

function Leaderboard() {

  const effectRan = useRef(false);
  const [IsLoading,setIsLoading] = useState(true);
  const [Leaders,setLeaders] = useState([]);

  useEffect(() => {
    async function loadTeams(){
      setIsLoading(true);
      await fetch('https://futbolargentinonode.onrender.com/leaderboard/')
        .then((response) => {
          response.json().then((data) =>{
            setLeaders(data)
            setIsLoading(false)
            })
        })
        .catch(error => {
          console.log(error);
          alert(error);
        });
    }
    setIsLoading(false);
    loadTeams();
    return () => effectRan.current = true;
  }, []);

  return (
    <div>
      <Navbar />
      <div className="text-white flex-col justify-center items-center">
        <img src={afaLogo} alt="logo" className="flex mx-auto justify-center max-w-[60px] m-4"/>
        <h1 className="text-white text-2xl font-bold m-5 p-5">Top 100 puntajes</h1>
        {IsLoading ?
          <div className="grid justify-center items-center max-w-[1240px] mx-auto p-7 mt-4">
            <BounceLoader className='' color="#36d7b7" />
          </div>:
          <>
              <table className="min-w-[80%] table-auto p-5 m-5 bg-gray-600 items-center justify-center max-w-[1240px] w-auto mx-auto">
                <thead className="table-auto p-5 bg-gray-600 items-center justify-center max-w-[1240px] w-auto mx-auto">
                  <tr className="table-auto p-5 bg-gray-600 items-center justify-center max-w-[1240px] w-auto mx-auto">
                    <th className="text-white p-2 items-center justify-center mx-auto">#</th>
                    <th className="text-white p-2 items-center justify-center mx-auto">Nombre</th>
                    <th className="text-white p-2 items-center justify-center mx-auto">Puntaje</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 w-auto mx-auto p-2">
                  {Leaders.sort((a, b) => b['Score'] - a['Score']).slice(0,100).map((member,index) => (
                    <tr key={index}>
                      <th className='border-b p-2 border-gray-600' scope="row">{index+1}</th>
                      <td className='border-b p-2 border-gray-600'>{member.Name}</td>
                      <td className='border-b p-2 border-gray-600'>{member.Score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </>
        }
      </div>
      <Footer />
    </div>
  )
}

export default Leaderboard;