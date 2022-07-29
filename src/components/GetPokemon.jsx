import React from 'react'
import { motion } from 'framer-motion'

export default function GetPokemon() {

  const [allPokemons, setAllPokemons] = React.useState([]);
  const [pokemons, setPokemons] = React.useState([]);
  const [filterekPokemon, setFilterekPokemon] = React.useState([]);
  const [deneme, setDeneme] = React.useState(null);

  const getAllPokemons = async () => {
    if(allPokemons.length === 0 ) {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1154");
      const data = await res.json();
      await setAllPokemons(data.results);
      console.log("pokemon added");
    }
    else {
      getPoke();
    }
  }  

  const getPoke = () => {
    if(pokemons.length === 0) {
      allPokemons.map(pokemon => {
        fetch(pokemon.url)
        .then(res => res.json())
        .then(data => {
          setPokemons(pokemons => [...pokemons, data].sort((a, b) => a.id - b.id));
        })
    }    
    )
  }
}

const searchPoke = (e) => {
  const search = e.target.value;
  const filteredPoke = pokemons.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase())
  }
  )
  setFilterekPokemon(filteredPoke)
}


// filtered card displayer
const renderFilteredPoke = filterekPokemon.map(pokemon => {
      return <motion.div 
        className="basic-card" 
        key={pokemon.id}
        whileHover={{ scale: 1.1 }}
        onClick={event => handleClick(event, pokemon.name)}
        >
      <div className="card-image">
        <img className='poke-img' src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className={`card-content ${pokemon.types[0].type.name}`}>
        <h3 className='poke-name'>{pokemon.name}</h3>
        <h4 className="poke-id">#{pokemon.id}</h4>
        <p className='poke-type'>{pokemon.types[0].type.name}</p>
      </div>
    </motion.div>
    }
  )



React.useEffect(() => {
    getAllPokemons();
  }, [allPokemons, pokemons]);

  // advanced card displayer
  const handleClick = (event, param) => {
    const tr = pokemons.find(pokemon => pokemon.name === param);
    console.log(tr);
     setDeneme(
      <div 
        className="adv-card"
        onClick={() => setDeneme(null)}        
        >
        <div className="card">
        <div className="card-image">
          <img className='poke-img' src={tr.sprites.front_default} alt={tr.name} />
        </div>
        <div className={`card-content ${tr.types[0].type.name}`}>
          <h3 className='poke-name'>{tr.name}</h3>
          <h4 className="poke-id">#{tr.id}</h4>
          <div className='poke-stats-container'>
          <div className='poke-stats'>
              <p className='poke-stat-name'>HP</p>
              <p className='poke-stat-value'>{tr.stats[5].base_stat}</p>
            </div>
            <div className='poke-stats'>
              <p className='poke-stat-name'>Attack</p>
              <p className='poke-stat-value'>{tr.stats[4].base_stat}</p>
            </div>
            <div className='poke-stats'>
              <p className='poke-stat-name'>Defense</p>
              <p className='poke-stat-value'>{tr.stats[3].base_stat}</p>
            </div>
            <div className='poke-stats'>
              <p className='poke-stat-name'>Sp. Attack</p>
              <p className='poke-stat-value'>{tr.stats[2].base_stat}</p>
            </div>
            <div className='poke-stats'>
              <p className='poke-stat-name'>Sp. Defense</p>
              <p className='poke-stat-value'>{tr.stats[1].base_stat}</p>
            </div>
            <div className='poke-stats'>
              <p className='poke-stat-name'>Speed</p>
              <p className='poke-stat-value'>{tr.stats[0].base_stat}</p>
            </div>
          </div>
          <p className='poke-type'>{tr.types[0].type.name}</p>
        </div>
        </div>
      </div>
    )
  };

  // basic card displayer
   if(pokemons.length === 1154) {
    const basicPokeCard = pokemons.map((pokemon) => {
    return (
      <motion.div 
        className="basic-card" 
        key={pokemon.id}
        whileHover={{ scale: 1.1 }}
        onClick={event => handleClick(event, pokemon.name)}        
        >
        <div className="card-image">
          <img className='poke-img' src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className={`card-content ${pokemon.types[0].type.name}`}>
          <h2 className='poke-name'>{pokemon.name}</h2>
          <h4 className="poke-id">#{pokemon.id}</h4>
          <p className='poke-type'>{pokemon.types[0].type.name}</p>
        </div>
      </motion.div>
        )
      }
      )
      return (
        <div className='poke-displayer'>
      <div className='search-bar'>
        <input className='search' type='text' placeholder='Search for a Pokemon' onChange={searchPoke} />
      </div>
        {deneme ? deneme : null}
        {filterekPokemon.length > 0 ? renderFilteredPoke : basicPokeCard}
      <div>
      </div>
    </div>
      );
    }
    else {
      return <div><h1>Loading...</h1></div>
    }
}
