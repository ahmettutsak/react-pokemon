import React from 'react'

export default function GetPokemon() {

  const [allPokemons, setAllPokemons] = React.useState([]);
  const [pokemons, setPokemons] = React.useState([]);
  const [filterekPokemon, setFilterekPokemon] = React.useState([]);

  const getAllPokemons = async () => {
    if(allPokemons.length === 0 ) {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1154");
      const data = await res.json();
      await setAllPokemons(data.results);
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
          setPokemons(pokemons => [...pokemons, data])
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

const renderFilteredPoke = filterekPokemon.map(pokemon => {
      return <div className="basic-card" key={pokemon.id}>
      <div className="card-image">
        <img className='poke-img' src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div className={`card-content ${pokemon.types[0].type.name}`}>
        <h3 className='poke-name'>{pokemon.name}</h3>
        <p className='poke-type'>{pokemon.types[0].type.name}</p>
      </div>
    </div>
    }
  )



React.useEffect(() => {
    getAllPokemons();
  }, [allPokemons, pokemons]);

  const basicPokeCard = pokemons.map((pokemon, index) => {
    return (
      <div className="basic-card" key={pokemon.id}>
        <div className="card-image">
          <img className='poke-img' src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className={`card-content ${pokemon.types[0].type.name}`}>
          <h3 className='poke-name'>{pokemon.name}</h3>
          <p className='poke-type'>{pokemon.types[0].type.name}</p>
        </div>
      </div>
    )
  }
  )

  return (
    <div className='poke-displayer'>
      <div className='search-bar'>
        <input className='search' type='text' placeholder='Search for a Pokemon' onChange={searchPoke} />
      </div>
      {filterekPokemon.length > 0 ? renderFilteredPoke : basicPokeCard}
    </div>
  )
}
