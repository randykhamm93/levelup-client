import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
  const [gameTypes, setGameTypes] = useState([])
  const navigate = useNavigate()

  /*
      Since the input fields are bound to the values of
      the properties of this state variable, you need to
      provide some default values.
  */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 0,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0
  })

  useEffect(() => {
    // Get the game types, then set the state
    getGameTypes()
      .then(data => setGameTypes(data))
  }, [])

  const changeGameState = (domEvent) => {
    const property = domEvent.target.name
    const newValue = domEvent.target.value

    const copy = { ...currentGame }
    copy[property] = newValue

    // Update game state with new value
    setCurrentGame(copy)
  }

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" required autoFocus className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input type="text" name="maker" required className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players: </label>
          <input type="number" name="numberOfPlayers" required className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level: </label>
          <select name="skillLevel" required className="form-control"
            value={currentGame.skillLevel}
            onChange={changeGameState}
          >
            <option value="">Select Skill Level</option>
            <option value="1">Beginner</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameTypeId">Game Type: </label>
          <select name="gameTypeId" required className="form-control"
            value={currentGame.gameTypeId}
            onChange={changeGameState}
          >
            <option value="">Select Game Type</option>
            {gameTypes.map(gameType => (
              <option key={gameType.id} value={gameType.id}>{gameType.type}</option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
      type="submit"
      onClick={evt => {
        // Prevent form from being submitted
        evt.preventDefault();

        const game = {
          maker: currentGame.maker,
          title: currentGame.title,
          number_of_players: parseInt(currentGame.numberOfPlayers),
          skill_level: parseInt(currentGame.skillLevel),
          game_type: parseInt(currentGame.gameTypeId),
        };

        // Send POST request to your API
        createGame(game).then(() => navigate("/games"));
      }}
      className="btn-2 btn icon-create"
    >
      Create Game
    </button>
  </form>
  )
}
