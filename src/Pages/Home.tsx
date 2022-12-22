import { useState } from "react"
import PlayerInput from "../components/PlayerInput"
import context from "../context/context"
import "./PagesStyle.css"

const Home = () => {
  const [playerName, setPlayerName] = useState("")
  const [updatedPlayerName, setUpdatedPlayerName] = useState(playerName)

  // To fix Eslint issue
  console.log(updatedPlayerName)

  const handleClick = () => {
    // "name" stores input field value in local storage and take you to quiz page
    localStorage.setItem("user", JSON.stringify(playerName))
    setUpdatedPlayerName(playerName)
    window.location.href = "/quiz"
  }

  return (
    <div>
      <div className="text-container">
        <p>
          This is a application created for a React Typscript / testing school
          project
        </p>
        <p className="underline">Get started:</p>
        <p>
          Choose a player name, a category and difficulty, harder difficulty can
          give you higher points if you answer correct.
        </p>
        <p className="underline">How to play:</p>
        <p>You will get 4 options and one is the correct answer.</p>
        <p>
          You have 30 seconds to answer the question and if the timer runs out
          you get 0 points.
        </p>
        <p>If you answer correctly you have to choose a new category.</p>
        <p>
          This will continue until all the questions is answered and then you
          will be able to see your final score.
        </p>
      </div>

      <p className="insert-name">Please insert player name to start:</p>

      <context.Provider value={{ playerName, setPlayerName }}>
        <PlayerInput />

        <button className="player-button" onClick={handleClick}>
          Continue
        </button>
      </context.Provider>
    </div>
  )
}

export default Home
