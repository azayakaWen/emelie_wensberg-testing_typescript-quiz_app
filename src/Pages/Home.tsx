import React, { useState } from "react"
import PlayerInput from "../components/PlayerInput"
import { useNavigate } from "react-router-dom"
import context from "../context/context"

const Home = () => {
  const navigate = useNavigate()

  const [playerName, setPlayerName] = useState("")
  const [updatedPlayerName, setUpdatedPlayerName] = useState(playerName)

  // To fix Eslint issue
  console.log(updatedPlayerName)

  const handleClick = () => {
    // "name" stores input field value in local storage and take you to quiz page
    localStorage.setItem("user", JSON.stringify(playerName))
    setUpdatedPlayerName(playerName)
    navigate("/quiz")
  }

  return (
    <>
      <p>
        This is a application created for a React Typscript / testing school
        project
      </p>
      <p>Please insert player name to start:</p>
      <context.Provider value={{ playerName, setPlayerName }}>
        <PlayerInput />
        <button onClick={handleClick}>Continue</button>
      </context.Provider>
    </>
  )
}

export default Home
