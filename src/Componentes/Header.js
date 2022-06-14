import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"




const Header = () => {

    const [infoPokemon, setInfoPokemon] = useState([])
    const [search, setSearch] = useState("")
    const [allPokemons, setAllPokemons] = useState([])
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

    const handleChange = e => {
        setSearch(e.target.value);
        filtrar(e.target.value);
    }
    

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = infoPokemon.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.pokemon.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
        });
        setAllPokemons(resultadosBusqueda);
    }



    const getAllPokemons = async () => {
        const res = await fetch(loadMore)
        const data = await res.json()

        setLoadMore(data.next)

        function createPokemonObject(results) {
            results.forEach(async pokemon => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json()
                setAllPokemons(currentList => [...currentList, data])
                await allPokemons.sort((a, b) => a.id - b.id)
            })
        }
        createPokemonObject(data.results)
    }

    useEffect(() => {
        getAllPokemons()
    }, [])


    return <div className="header">

        <div className="main">
            <h1>The Pokemon Store</h1>
            <div className="search-container">
            <div className="search">
                <input type="text" placeholder="Choose your pokemon" required onChange={handleChange} >
                </input>
                <div className="btn">
                    <FaSearch></FaSearch>
                </div>
            </div>
            </div>
        </div>
    </div>;
}

export default Header;