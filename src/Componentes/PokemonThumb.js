import React from 'react'

const PokemonThumb = ({id, image, name, type, base_stat }) => {
    const style = type + " thumb-container";
    const random = (min,max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    return (
        <div className={style}>
            <div className="number"><small>#0{id}</small></div>
            <img src={image} alt={name} />
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <small>Type: {type}</small>
                <h3>$ {random(1,500)} </h3>
            </div>
        </div>
    )
}

export default PokemonThumb