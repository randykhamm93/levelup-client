import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get the event ID
import { getEventById } from "../../managers/EventManager"; // Create a function to get event by ID

export const EventDetail = () => {
  const { eventId } = useParams(); // Get the event ID from the URL parameter
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEventById(eventId).then(data => setEvent(data));
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p>Number of players needed: {event.number_of_players}</p>
      <p>Skill level: {event.skill_level}</p>
    </div>
  );
}
