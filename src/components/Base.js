import {React, useState, useEffect, useRef} from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import BounceLoader from "react-spinners/BounceLoader";
import CardsDisplay from './CardsDisplay';

function App() {

  const [TeamsNotDisplayed,setTeamsNotDisplayed] = useState();
  const [TeamsCopy,setTeamsCopy] = useState();
  const [IsLoading,setIsLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    async function loadTeams(){
      setIsLoading(true);
      await fetch('https://estadiosapi.vercel.app/api/v1/teams/')
        .then((response) => {
          response.json().then((data) =>{
            setTeamsNotDisplayed(data)
            setTeamsCopy(data)
            setIsLoading(false)
            })
        })
        .catch(error => {
          alert(error);
        });
    }
    setIsLoading(false);
    loadTeams();
    return () => effectRan.current = true;
  }, []);


  return (
    <div className="App mt-auto d-flex flex-column min-vh-100">
      <Navbar />
      { IsLoading ?
        <div className="grid justify-center items-center max-w-[1240px] mx-auto p-7 mt-4">
          <BounceLoader className='heroContainer' color="#36d7b7" />
        </div>
        :
        <>
          {TeamsNotDisplayed && <CardsDisplay IsLoading={IsLoading} teams={TeamsNotDisplayed}/>}
          <Footer />
        </>
      }
    </div>
  );
}

export default App;
