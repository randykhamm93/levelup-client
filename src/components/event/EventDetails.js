import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; 
import { getEventById } from "../../managers/EventManager"; 
import { getGamerByUserId } from "../../managers/UserManager";

export const EventDetails = () => {
  const { eventId } = useParams(); 
  const [event, setEvent] = useState(null);
  const [organizerData, setOrganizerData] = useState([]);

  useEffect(() => {
    getEventById(eventId).then(data => {
      setEvent(data);
      fetchOrganizerData(data.organizer);
    });
  }, [eventId]);

  const fetchOrganizerData = async (organizerId) => {
    try {
      const organizerDataArray = await getGamerByUserId(organizerId);
      const organizerData = organizerDataArray;
      setOrganizerData(organizerData);
    } catch (error) {
      console.error("Error fetching organizer data:", error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p>Number of players needed: {event.number_of_players}</p>
      <p>Skill level: {event.skill_level}</p>
      <p>Event date: {event.date}</p>
      <p>Organized by: {organizerData?.first_name} {organizerData?.last_name}</p>
      <button>
        <Link to={`/events/${eventId}/edit`} className="btn btn-primary">Edit Event</Link>
      </button>
    </div>
  );
};
