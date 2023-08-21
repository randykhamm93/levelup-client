import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameById, updateGame } from "../../managers/GameManager"; 

export const UpdateGame = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();

    const [gameData, setGameData] = useState({
        title: "",
        number_of_players: 0,
        skill_level: ""
    });

    useEffect(() => {
        // Fetch the game data using the gameId
        getGameById(gameId).then(data => {
            setGameData(data);
        });
    }, [gameId]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setGameData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        // Call the updateGame function with the updated game data
        updateGame(gameId, gameData)
            .then(() => {
                navigate(`/games/${gameId}`);
            })
            .catch(error => {
                // Handle error
            });
    };

    return (
        <div>
            <h2>Update Game</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={gameData.title}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Number of Players:
                    <input
                        type="number"
                        name="number_of_players"
                        value={gameData.number_of_players}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Skill Level:
                    <input
                        type="text"
                        name="skill_level"
                        value={gameData.skill_level}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Update Game</button>
            </form>
        </div>
    );
};
