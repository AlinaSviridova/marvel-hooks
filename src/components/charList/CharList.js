import {useState, useRef, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import MarvelService from '../../services/MarvelService'
// import Spinner from '../spinner/Spinner'
import './charList.scss';




const CharList = (props) => {

    const [chars, setCharlist] = useState([]);
    const [loaing, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded] = useState(false);

    // focusRef = React.createRef();

   
    const marvelService = new MarvelService();

    useEffect (() => {
        onRequest();
    }, [])
     

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
        .getAllCharacters(offset)
        .then(createList)
        .catch(onError)
    } 

    const onCharListLoading = () => {
         setNewItemLoading(true);
    }
 
    const createList = (newCharList) => { 
        let ended = false; 
        if (newCharList.length < 9){
            ended = true;
        }
 
        setCharlist(chars => [...chars, ...newCharList]);
        setLoading(loaing => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        charEnded(charEnded => ended);

    }
    
    const onError = () => {
        setError(true);
        setLoading(loading => false);
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

        return (
            <div className="char__list">
                <ul className="char__grid">
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
    onCharSelected: PropTypes.func
}

export default CharList;