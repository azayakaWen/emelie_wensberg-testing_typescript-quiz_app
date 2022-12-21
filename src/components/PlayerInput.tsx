import React, { useContext } from "react"
import context from "../context/context"
import "./ComponentsStyle.css"

const PlayerInput = () => {
  const { playerName, setPlayerName } = useContext(context)

  const handleChange = (e: {
    // Handel the change in the input field
    target: { value: React.SetStateAction<string> }
  }) => {
    setPlayerName(e.target.value)
  }

  return (
    <>
      <input
        className="player-name"
        type="text"
        placeholder="Player name"
        onChange={handleChange}
        value={playerName}
      />
    </>
  )
}

export default PlayerInput
