import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
const PokemonRow = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button variant="contained" onClick={() => onSelect(pokemon)}>SELECT!</Button>
    </td>
  </tr>  
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
}

const PokemonInfo = ({name, base}) => (
  <div className='sideShow'>
    <h1>
      {name.english}
    </h1>
    <table className='tableOne'>
      {
        Object.keys(base).map(key => 
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>  
        )
      }
    </table>
</div>  
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired
  })  
}

const Title = styled.h1`
  text-align: center;
  background-color: rgb(253, 188, 67);
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      selectedItem: null,
      pokemon: [],
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/test-deployment-app/pokemon.json")
    .then(resp => resp.json())
    .then(pokemon => this.setState({...this.state, pokemon}));
  }

  render () {
    return (
      <div className='mainDiv'>
        <Title>Pokemon Search</Title>
        <input value={this.state.filter} onChange={(e) => this.setState({...this.state, filter: e.target.value})}/>
        <TwoColumnLayout>
          <div>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>          
            </thead>
            <tbody> 
              {
                this.state.pokemon.filter((pokemon) => pokemon.name.english.toLowerCase().includes(this.state.filter.toLowerCase())).slice(0, 20).map((pokemon) => (
                  <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => this.setState({...this.state, selectedItem:pokemon})}/>
                ))
              }
            </tbody>
          </table>
          </div>
          {
            this.state.selectedItem && <PokemonInfo {...this.state.selectedItem} />
          }
        </TwoColumnLayout>
      </div>
    );    
  }
}

export default App;