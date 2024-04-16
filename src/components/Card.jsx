import Button from './Button';
import './Card.css';

const Card = (props) => {
    const { id, name, type, imageUrl, handleModalApperance, pokemonData } = props;
    
    return (
        <div className={`card ${type}-card`}>
            <div className={`idCard ${type}-id ` }>#{id}</div>
            <img src={imageUrl} alt="" className='pokemonImage'/>
            <div className='pokemonNameCard'>{name}</div>
            <div className='pokemonType'>Type: {type} </div>
            <Button theme={type} content={"Know More..."} onClick={()=> handleModalApperance(pokemonData)} />
        </div>
    )
}
export default Card