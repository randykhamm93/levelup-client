import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../managers/EventManager";
import { getGamerByUserId } from "../../managers/UserManager";

export const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

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
                                {event.title} by {organizerData?.first_name} {organizerData?.last_name}
                            </div>
                            <div className="event__players">{event.number_of_players} players needed</div>
                            <div className="event__skillLevel">Skill level is {event.skill_level}</div>
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
