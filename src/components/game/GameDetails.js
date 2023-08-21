import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGameById } from "../../managers/GameManager";
import { getGamerByUserId } from "../../managers/UserManager";

export const GameDetails = () => {
  const { gameId } = useParams(); 
  const [game, setGame] = useState(null);
  const [creatorData, setCreatorData] = useState([]);

  useEffect(() => {
    getGameById(gameId).then(gameData => {
      setGame(gameData);
      fetchCreatorData(gameData.creator); // 
    });
  }, [gameId]);

  const fetchCreatorData = async (creatorId) => {
    try {
      const creatorDataArray = await getGamerByUserId(creatorId);
      const creatorData = creatorDataArray; 
      setCreatorData(creatorData);
    } catch (error) {
      console.error("Error fetching creator data:", error);
    }
  };

  if (!game || !creatorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-details">
      <h2>{game.title}</h2>
      <p>Number of players needed: {game.number_of_players}</p>
      <p>Skill level: {game.skill_level}</p>
      <p>Created by: {creatorData.first_name} {creatorData.last_name}</p>
      <p>Game Type: {game.game_type}</p>
      <p>Maker: {game.maker}</p>
      <button>
        <Link to={`/games/${gameId}/edit`} className="btn btn-primary">Edit Game</Link>
      </button>
    </div>
);
};
