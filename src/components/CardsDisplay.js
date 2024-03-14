import React, { useState, useRef } from "react";
import afaLogo from '../images/afa.webp';
import Card from "./Card";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";
import { FaThumbsDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function CardsDisplay({ IsLoading, teams }) {
  const [availablePairs, setAvailablePairs] = useState(teams);
  const [score,setScore] = useState(0);
  const [displayAlert,setDisplayAlert] = useState(false);
  const [lostGame,setLostGame] = useState(false);
  const nameInputRef = useRef(null);
  const nameref = useRef(null);

  function restartGame() {
    setLostGame(true)
    if (score===0) {
      nameref.current.reset();
    }
    else {
      const newScore = {'Name' : nameInputRef.current.value, 'Score': score}
      axios.post('https://estadiosapi.vercel.app/api/v1/leaderboard/', newScore)
          .then(response => console.log("New score: ",newScore));
      setScore(0)
      setAvailablePairs(teams);
      nameref.current.reset();
      alert("Puntaje añadido a la lista")
    }
}

  function checkItemsRemaining(teamsLeft) {
    if (teamsLeft<2){
      alert("You won!")
      restartGame()
    }
  }

  const shufflandFiltereArray = () => {
    const removeItems=[availablePairs[0].id,availablePairs[1].id];
    const newTeamsList = availablePairs.filter(item => !removeItems.includes(item.id))

    for (let i = newTeamsList.length - 1; i > 2; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newTeamsList[i], newTeamsList[j]] = [newTeamsList[j], newTeamsList[i]];
    }
    setAvailablePairs([...newTeamsList]);
  };

  function clickedLeft () {
    if (nameInputRef.current.value === ''){
      setDisplayAlert(true)
    }
    else {
      setDisplayAlert(false)
      if (availablePairs[0].StadiumCapacity >= availablePairs[1].StadiumCapacity)
      {
        shufflandFiltereArray()
        setScore((oldScore) => oldScore+1)
        checkItemsRemaining(availablePairs.length - 2 )
      }
      else{
        restartGame()
      }
    }
  }

  function clickedRight () {
    if (nameInputRef.current.value === ''){
      setDisplayAlert(true)
    }
    else {
      setDisplayAlert(false)
      if (availablePairs[0].StadiumCapacity < availablePairs[1].StadiumCapacity)
      {
        shufflandFiltereArray()
        setScore((oldScore) => oldScore+1)
        checkItemsRemaining(availablePairs.length - 2 )
      }
      else{
        restartGame()
      }
    }
  }

  function hideDisplay () {
    setDisplayAlert(false)
  }
  function hideLostGame () {
    setLostGame(false)
  }

  return (
    <div id='Home' className="text-white flex-col justify-center items-center">
      {displayAlert ?
        <div class="bg-red-100 border flex border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <div className=" flex-col mx-auto text-center justify-center object-center ">
            <strong class="font-bold">Error!</strong>
            <br/>
            <span class="block sm:inline">El nombre no puede estar vacio</span>
          </div>
          <button onClick={hideDisplay}>
            <AiOutlineClose className=" flex justify-center object-center items-center my-auto" size={20} />
          </button>
        </div>
        : null
      }
      {lostGame ?
        <div class="bg-[#75aadb] border flex border-gray-300 text-[#000] px-4 py-3 rounded relative" role="alert">
          <div className=" flex-col mx-auto text-center justify-center object-center ">
            <div className="flex mx-auto text-center justify-center">
              <FaThumbsDown size={25} className="m-2" />
              <strong class="font-bold text-2xl">Perdiste!</strong>
              <FaThumbsDown size={25} className="m-2" />
            </div>
            <br/>
            <span class="block sm:inline text-xl">Gracias por jugar. Puntaje añadido a la lista</span>
          </div>
          <button onClick={hideLostGame}>
            <AiOutlineClose className=" flex justify-center object-center items-center my-auto" size={20} />
          </button>
        </div>
        : null}
      <img src={afaLogo} alt="logo" className="flex mx-auto justify-center max-w-[60px] m-4"/>
      <div className="flex mx-auto justify-center">
        <h1 className="text-5xl pr-2">Que estadio es</h1>
        <h1 className="text-5xl text-[#75aadb] pr-2"> más grande</h1>
        <h1 className="text-5xl ">?</h1>
      </div>
      <h3 className="text-3xl m-4">Score: {score}</h3>
      <form ref={nameref}>
        <div className="">
          <input type="text" className="border p-2 bg-slate-800" ref={nameInputRef} id="Nombre" placeholder="Tu Nombre aca..."/>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center max-w-[1240px] mx-auto p-7 mt-4">
        { IsLoading ?
          <BounceLoader color="#36d7b7" /> :
            <>
              <div className="m-2">
                <button className='' onClick={clickedLeft}>
                  <Card data={availablePairs[0]} />
                </button>
              </div>
              <div className="m-2">
                <button className='' onClick={clickedRight}>
                  <Card data={availablePairs[1]} />
                </button>
              </div>
          </>
        }
      </div>
    </div>
  )
}

export default CardsDisplay;