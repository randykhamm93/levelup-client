import React, { useEffect, useState } from "react";
import { getGames } from "../../managers/GameManager.js";
import { getGamerByUserId } from "../../managers/UserManager.js"; 
import { useNavigate } from "react-router-dom";

export const GameList = (props) => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getGames().then(data => {
            fetchCreators(data); 
        });
    }, []);

    const fetchCreators = async (gamesData) => {
        const gamesWithCreators = await Promise.all(
            gamesData.map(async (game) => {
                const creatorDataArray = await getGamerByUserId(game.creator);
                const creatorData = creatorDataArray;
                return { ...game, creatorData };
            })
        );
        setGames(gamesWithCreators);
    };

    return (
        <>
            <article className="games">
                {games.map(game => {
                    const creatorData = game.creatorData; 
                    return (
                        <section key={`game--${game.id}`} className="game">
                            <div className="game__title">{game.title} by {creatorData.first_name} {creatorData.last_name}</div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        </section>
                    );
                })}
            </article>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" });
                }}
            >
                Register New Game
            </button>
        </>
    );
};
