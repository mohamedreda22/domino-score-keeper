import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : [];
  });
  const [playerName, setPlayerName] = useState("");
  const [scoreChange, setScoreChange] = useState({});

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const addPlayer = () => {
    if (playerName.trim()) {
      setPlayers([...players, { name: playerName, score: 0 }]);
      setPlayerName("");
    }
  };

  const updateScore = (index) => {
    const change = parseInt(scoreChange[index]) || 0;
    if (!isNaN(change)) {
      const newPlayers = [...players];
      newPlayers[index].score += change;
      setPlayers(newPlayers);
      setScoreChange({ ...scoreChange, [index]: "" });
    }
  };

  const resetScores = () => {
    setPlayers(players.map((player) => ({ ...player, score: 0 })));
  };

  const getRankLogo = (rank) => {
    const rankImages = [
      "icons8-first.gif",
      "icons8-medal-second-place.gif",
      "icons8-medal-third-place.gif",
      "icons8-coronavirus1.gif",
    ];
    return rank < rankImages.length ? rankImages[rank] : null;
  };

  const getRankClass = (rank) => {
    const rankColors = ["gold", "silver", "bronze", "red"];
    return rank < rankColors.length ? rankColors[rank] : "white";
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="container">
      <div className="header">
      <h1>Score Keeper</h1>
      <img src="My LOGO.jpg" className="Logo" alt="logo" />
      </div>
      <div className="add-player">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter player name"
        />
        <button onClick={addPlayer}>Add Player</button>
      </div>

      <ul className="score-list">
        {sortedPlayers.map((player, index) => (
          <li key={index} className="player" style={{ backgroundColor: getRankClass(index)}}>
            <span>
              {player.name}: {player.score} pts
            </span>
            <div className="rank-window">
            {index < 4 && (
              <img
                src={getRankLogo(index)}
                alt={`${index + 1} place`}
                className="rank-logo"
              />
            )}
            </div>
            <input
              type="number"
              value={scoreChange[index] || ""}
              placeholder="Enter score change"
              onChange={(e) =>
                setScoreChange({ ...scoreChange, [index]: e.target.value })
              }
            />
            <button onClick={() => updateScore(index)} className="updateScore">
              Update Score
            </button>
          </li>
        ))}
      </ul>

      {players.length > 0 && (
        <button className="reset-btn" onClick={resetScores}>
          Reset Scores
        </button>
      )}
    </div>
  );
}

export default App;
