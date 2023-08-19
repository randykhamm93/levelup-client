import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getGames } from '../../managers/GameManager.js';
import { createEvent } from '../../managers/EventManager.js';

export const EventForm = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const [currentEvent, setCurrentEvent] = useState({
    skillLevel: "",
    numberOfPlayers: 0,
    title: "",
    game: "",
    date: "",
    location: "",
    organizer: 0
  });

  useEffect(() => {
    getGames().then(data => setGames(data));
  }, []);

  const changeEventState = (domEvent) => {
    const property = domEvent.target.name;
    const newValue = domEvent.target.value;

    const copy = { ...currentEvent };
    copy[property] = newValue;

    setCurrentEvent(copy);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const event = {
      title: currentEvent.title,
      number_of_players: parseInt(currentEvent.numberOfPlayers),
      skill_level: parseInt(currentEvent.skillLevel),
      game: parseInt(currentEvent.game),
      date: currentEvent.date,
      organizer: parseInt(currentEvent.organizer)
    };

    // Send POST request to your API
    createEvent(event).then(() => navigate("/events"));
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Register New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" required autoFocus className="form-control"
            value={currentEvent.title}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players: </label>
          <input type="number" name="numberOfPlayers" required className="form-control"
            value={currentEvent.numberOfPlayers}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="event_date">Event Date: </label>
          <input
            type="date"
            name="date"
            required
            autoFocus
            className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level: </label>
          <select name="skillLevel" required className="form-control"
            value={currentEvent.skillLevel}
            onChange={changeEventState}
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
          <label htmlFor="game">Game: </label>
          <select name="game" required className="form-control"
            value={currentEvent.game}
            onChange={changeEventState}
          >
            <option value="">Select Game </option>
            {games.map(game => (
              <option key={game.id} value={game.id}>{game.title}</option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={handleSubmit}
        className="btn-2 btn icon-create"
      >
        Create Event
      </button>
    </form>
  );
};
