import React, { useState } from 'react';


interface PlayerProps {
  name: string;
  onDelete: () => void;
}

const Player: React.FC<PlayerProps> = ({ name, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [backgroundColor, setBackgroundColor] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Aquí puedes guardar el nuevo nombre y color de fondo
    // y actualizar el estado en la lista de jugadores.
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
          <button onClick={handleSaveClick}>Guardar</button>
        </div>
      ) : (
        <div>
          <p style={{ backgroundColor }}>{editedName}</p>
          <button onClick={onDelete}>Eliminar</button>
          <button onClick={handleEditClick}>Editar</button>
        </div>
      )}
    </div>
  );
};


export default Player;