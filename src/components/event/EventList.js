import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvent, getEvents } from "../../managers/EventManager";
import { getGamerByUserId } from "../../managers/UserManager";

export const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const handleDelete = (eventId) => {
        deleteEvent(eventId)
        .then(() => {
            fetchEvents(); // Fetch the updated list of events after deletion
        })
        .catch(error => {
            console.error("Error deleting game:", error);
        });
};

const fetchEvents = () => {
    getEvents()
        .then(data => {
            fetchOrganizers(data);
        })
        .catch(error => {
            console.error("Error fetching events:", error);
        });
};
    useEffect(() => {
        getEvents().then(data => {
            fetchOrganizers(data);
        });
    }, []);

    const fetchOrganizers = async (eventData) => {
        const fetchOrganizers = await Promise.all(
            eventData.map(async (event) => {
                const organizerDataArray = await getGamerByUserId(event.organizer);
                const organizerData = organizerDataArray;
                return { ...event, organizerData };
            })
        );
        setEvents(fetchOrganizers);
    };

    return (
        <>
            <article className="events">
                {events.map(event => {
                    const organizerData = event.organizerData;

                    return (
                        <section key={`event--${event.id}`} className="event">
                            <div className="event__title">
                                <Link to={`/events/${event.id}`}> {event.title} </Link> by {organizerData?.first_name} {organizerData?.last_name}
                            </div>
                            <div className="event__players">{event.number_of_players} players needed</div>
                            <div className="event__skillLevel">Skill level is {event.skill_level}</div>
                            <button
                                key={`delete-button--${event.id}`}
                                onClick={() => handleDelete(event.id)}
                                className="btn btn-3"
                            >Delete</button>
                        </section>
                    );
                })}
            </article>

            <button
                className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" });
                }}
            >
                Create New Event
            </button>
        </>
    );
};
