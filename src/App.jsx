import { useEffect, useState } from 'react';
import './App.css';
import CardList from './components/CardList';
import Modal from './components/Modal';


function App() {

  //getting the inital Api from the given Data and initalizing in a variable 

  const initalApi = 'https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1';


  const [pokemonApiEnd, setApiEnd] = useState(initalApi);

  const [pokemonData, setPokemonData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [modalData, setModalData] = useState({});


  // i am calling the function Using asyn function which returns us a promise 

  async function getPokemonData(apiEndPoint) {

    // here we are fetching the data in the response variable with a await key before fetch 
    //it waits till the total data gets fetched from the api and it return in the response Variable

    const response = await fetch(apiEndPoint);

    // using the .json() we can convert the json String file to js object file and stores the data in pokemonData
    const pokemonData = await response.json();

    // we are setting the next page url from the data in the pokemonData to setApiEnd
    setApiEnd(pokemonData[0].next);


    //from the above data we came to know that there are indiviual urls present in indiviual objects
    // we are using map function to fetch the url from the indiviual objects

    const promisePokemonArray = pokemonData[0].results.map((pokemon) => {
      return fetch(pokemon.url);
    })

    // to fetch the urls in parallel we use the promise.all function

    let individualPromisesArrayResponse = await Promise.all(promisePokemonArray);

    //we are converting the file from json String to Js using .json() function

    individualPromisesArrayResponse = individualPromisesArrayResponse.map((pokemonResponse) => {
      return pokemonResponse.json();
    })

    const individualPromisesArrayData = await Promise.all(individualPromisesArrayResponse);

    const finalPokemonArray = individualPromisesArrayData.map((pokemonArr) => {
      return pokemonArr[0]
    })


    setPokemonData((prev) => {
      return [...prev, ...finalPokemonArray];
    })

  }


  function handleClickMorePokemons() {
    getPokemonData(pokemonApiEnd);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleModalApperance(data) {
    setModalData(data);
    setShowModal(true);
  }

  //using the UseEffect we are conforming that making the Api Calling is called once only
  useEffect(() => {
    getPokemonData(pokemonApiEnd);
  }
    , []
  )


  return (
    <>
      <div className='pokemonKingdom'>
        <div className='pageTitle'>
          <h1>Pokemon</h1>
          <h1>Pokemon</h1>
        </div>
        <div className='pageTitle2'>
          <h1>KingDom</h1>
          <h1>KingDom</h1>
        </div>
      </div>

      <CardList pokemonData={pokemonData} handleModalApperance={handleModalApperance} />

      <Modal open={showModal} closeModal={closeModal} data={modalData} />

      {pokemonApiEnd &&
        <div className='morePokemonDiv'>
          <button className='morePokemonBtn' onClick={handleClickMorePokemons} >More Pokemons</button>
        </div>
      }
    </>
  )
}

export default App