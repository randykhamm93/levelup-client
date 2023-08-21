import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getGames, deleteGame } from "../../managers/GameManager.js";
import { getGamerByUserId } from "../../managers/UserManager.js"; 
import { useNavigate } from "react-router-dom";


export const GameList = (props) => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const handleDelete = (gameId) => {
        deleteGame(gameId)
            .then(() => {
                fetchGames(); // Fetch the updated list of games after deletion
            })
            .catch(error => {
                console.error("Error deleting game:", error);
            });
    };

    const fetchGames = () => {
        getGames()
            .then(data => {
                fetchCreators(data);
            })
            .catch(error => {
                console.error("Error fetching games:", error);
            });
    };


    useEffect(() => {
        fetchGames();
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
                            <div className="game__title">
                                <Link to={`/games/${game.id}`}> {game.title} </Link>
                                by {creatorData.first_name} {creatorData.last_name}</div>
                            <div className="game__players">{game.number_of_players} players needed</div>
                            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                            <button
                                key={`delete-button--${game.id}`}
                                onClick={() => handleDelete(game.id)}
                                className="btn btn-3"
                            >Delete</button>
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
