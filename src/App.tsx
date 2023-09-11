import { useState } from 'react'
import Player from './Player'
import './App.css'



function App() {
  const [players, setPlayers] = useState<{ name: string; backgroundColor: string }[]>([]);
  const [newPlayer, setNewPlayer] = useState<string>('');

  const handleAddPlayer = () => {
    if (newPlayer.trim() !== '') {
      setPlayers([...players, { name: newPlayer, backgroundColor: '' }]);
      setNewPlayer('');
    }
  };

  const handleDeletePlayer = (index: number) => {
    const updatedPlayers = [...players];
    updatedPlayers.splice(index, 1);
    setPlayers(updatedPlayers);
  };

  return (
    <div className="App">
      <h1>Lista de Jugadores</h1>
      <div>
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
        />
        <button onClick={handleAddPlayer}>Agregar Jugador</button>
      </div>
      <div>
        {players.map((player, index) => (
          <Player
            key={index}
            name={player.name}
            onDelete={() => handleDeletePlayer(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App
