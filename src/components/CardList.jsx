import React from 'react';
import Card from './Card';
import './CardList.css';

const CardList = ({ pokemonData, handleModalApperance }) => {
    return (

        <div className='pokemonList'>
            {pokemonData.map((pokemon) => {
                return <Card id={pokemon.id} name={pokemon.name} type={pokemon.type} key={pokemon.id} imageUrl={pokemon.image} pokemonData={pokemon} handleModalApperance={handleModalApperance} />
            })}
        </div>
    )
}

export default CardList