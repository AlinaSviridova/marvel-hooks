import {useState, useRef, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import useMarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './charList.scss';




const CharList = (props) => {

    const [chars, setCharlist] = useState([]); 
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    // focusRef = React.createRef();
    const {loading, error, getAllCharacters} = useMarvelService();
   
    // const marvelService = useMarvelService();

    useEffect (() => {
        onRequest(offset, true);
    }, [])
     

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
        .then(createList) 
    } 
 
 
    const createList = (newCharList) => { 
        let ended = false; 
        if (newCharList.length < 9){
            ended = true;
        }
 
        setCharlist(chars => [...chars, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);

    } 
    const itemRefs = useRef([]);
    
    const focusOnItem = (id) => {
 
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
 
        const elements = chars.map ((item, i) => {
        const {name, thumbnail, id} = item; 
            return ( 
                 <li className="char__item"
                 key={id}
                 ref={el => itemRefs.current[i] = el}
                 tabIndex={0}
                 onClick={() => {
                    props.onCharSelected(id);
                    focusOnItem(i)
                }}
                 onKeyPress={(e) => {
                     if (e.key === ' ' || e.key === "Enter") {
                         props.onCharSelected(id);
                         focusOnItem(i);
                     }
                 }}> 
                        <img src={thumbnail} alt={name}/>
                        <div className="char__name">{name}</div>
                    </li> 
            )
        });

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                {errorMessage}
                {spinner}
                {elements}
                </ul>
                <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        ) 
}

CharList.propTypes = { 
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;