import React, { useState } from 'react';

const App: React.FC = () => {
  const [players, setPlayers] = useState<{ name: string; points: number; money: number }[]>([]);
  const [newPlayer, setNewPlayer] = useState<string>('');
  const [moneyInputs, setMoneyInputs] = useState<{ [key: number]: number }>({});
  const [clickCounts, setClickCounts] = useState<{ [key: number]: { plus2: number; plus4: number } }>({});
  const [showStartGameButton, setShowStartGameButton] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const [playerWithMostPlus2, setPlayerWithMostPlus2] = useState<number | null>(null);
  const [playerWithMostPlus4, setPlayerWithMostPlus4] = useState<number | null>(null);

  const handleAddPlayer = () => {
    if (newPlayer.trim() !== '' && players.length < 6 && !gameStarted) {
      const updatedPlayers = [...players, { name: newPlayer, points: 0, money: 0 }];
      setPlayers(updatedPlayers);
      setMoneyInputs({ ...moneyInputs, [players.length]: 0 });
      setClickCounts({ ...clickCounts, [players.length]: { plus2: 0, plus4: 0 } });
      setNewPlayer('');

      if (updatedPlayers.length >= 2) {
        setShowStartGameButton(true);
      }
    }
  };

  const handleAddPoints = (playerIndex: number, pointsToAdd: number) => {
    if (gameStarted) {
      const updatedPlayers = [...players];
      updatedPlayers[playerIndex].points += pointsToAdd;
      setPlayers(updatedPlayers);

      const updatedClickCounts = { ...clickCounts };
      updatedClickCounts[playerIndex] = {
        ...updatedClickCounts[playerIndex],
        [pointsToAdd === 2 ? 'plus2' : 'plus4']: (updatedClickCounts[playerIndex][pointsToAdd === 2 ? 'plus2' : 'plus4'] || 0) + 1,
      };
      setClickCounts(updatedClickCounts);

      if (pointsToAdd === 2) {
        if (playerWithMostPlus2 === null || updatedClickCounts[playerIndex].plus2 > clickCounts[playerWithMostPlus2]?.plus2) {
          setPlayerWithMostPlus2(playerIndex);
        }
      }

      if (pointsToAdd === 4) {
        if (playerWithMostPlus4 === null || updatedClickCounts[playerIndex].plus4 > clickCounts[playerWithMostPlus4]?.plus4) {
          setPlayerWithMostPlus4(playerIndex);
        }
      }
    }
  };

  const handleMoneyChange = (event: React.ChangeEvent<HTMLInputElement>, playerIndex: number) => {
    if (gameStarted) {
      const moneyValue = parseFloat(event.target.value);
      setMoneyInputs({ ...moneyInputs, [playerIndex]: moneyValue });
    }
  };

  const handleSaveMoney = (playerIndex: number) => {
    if (gameStarted) {
      const updatedPlayers = [...players];
      updatedPlayers[playerIndex].money = moneyInputs[playerIndex];
      setPlayers(updatedPlayers);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setShowStartGameButton(false);
  };

  const calculateWinner = () => {
    let maxPoints = -1;
    let maxMoney = -1;
    let winners: string[] = [];

    players.forEach((player) => {
      if (player.points > maxPoints) {
        maxPoints = player.points;
        winners = [player.name];
      } else if (player.points === maxPoints) {
        winners.push(player.name);
      }

      if (player.money > maxMoney) {
        maxMoney = player.money;
        winners = [player.name];
      } else if (player.money === maxMoney) {
        winners.push(player.name);
      }
    });

    if (winners.length === 1) {
      return `El ganador es: ${winners[0]}`;
    } else if (winners.length > 1) {
      return `¡Empate! Los jugadores que empataron son: ${winners.join(', ')}`;
    } else {
      return 'No hay ganador.';
    }
  };

  const handleCalculateWinner = () => {
    const winnerMessage = calculateWinner();
    alert(winnerMessage);
  };

  return (
    <div>
      <h1>Gestión de Jugadores (Máximo de 6 jugadores)</h1>
      <div>
        <h2>Agregar Jugador</h2>
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          disabled={gameStarted}
        />
        <button onClick={handleAddPlayer} disabled={gameStarted}>Agregar</button>
      </div>
      <div>
        <h2>Lista de Jugadores</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.name} - Puntos: {player.points} - Dinero: {player.money}
              <>
                <button
                  onClick={() => handleAddPoints(index, 2)}
                  disabled={!gameStarted}
                >
                  +2 - {clickCounts[index]?.plus2 || 0} {playerWithMostPlus2 === index && <span>*</span>}
                </button>
                <button
                  onClick={() => handleAddPoints(index, 4)}
                  disabled={!gameStarted}
                >
                  +4 - {clickCounts[index]?.plus4 || 0} {playerWithMostPlus4 === index && <span>*</span>}
                </button>
                <input
                  type="number"
                  value={moneyInputs[index] || ''}
                  onChange={(e) => handleMoneyChange(e, index)}
                  disabled={!gameStarted}
                />
                <button
                  onClick={() => handleSaveMoney(index)}
                  disabled={!gameStarted}
                >
                  Guardar Dinero
                </button>
              </>
            </li>
          ))}
        </ul>
      </div>
      {showStartGameButton && players.length >= 2 && (
        <button onClick={handleStartGame}>Comenzar Partida</button>
      )}
      {gameStarted && (
        <button onClick={handleCalculateWinner}>Calcular Ganador</button>
      )}
    </div>
  );
};

export default App;
