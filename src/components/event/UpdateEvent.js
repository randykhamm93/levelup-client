import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../../managers/EventManager"; 

export const UpdateEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();

    const [eventData, setEventData] = useState({
        title: "",
        number_of_players: 0,
        skill_level: "",
    });

    useEffect(() => {
        // Fetch the event data using the eventId
        getEventById(eventId).then(data => {
            setEventData(data);
        });
    }, [eventId]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setEventData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        // Call the updateGame function with the updated game data
        updateEvent(eventId, eventData)
            .then(() => {
                navigate(`/events/${eventId}`);
            })
            .catch(error => {
                // Handle error
            });
    };

    return (
        <div>
            <h2>Update Event</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Number of Players:
                    <input
                        type="number"
                        name="number_of_players"
                        value={eventData.number_of_players}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Skill Level:
                    <input
                        type="text"
                        name="skill_level"
                        value={eventData.skill_level}
                        onChange={handleInputChange}
                    />
                </label>
                {/* Other input fields */}
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};
