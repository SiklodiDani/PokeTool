import React from "react";

const PokemonCard = ({id, name, image, type}) => {
    return (
        <div>
            <div>
            {id}
            </div>
            <div>
              <img src={image} alt={name} /> 
              {name}
            </div>

        </div>
    )
}

export default PokemonCard;