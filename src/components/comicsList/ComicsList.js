import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import useMarvelService from '../../services/MarvelService'
import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect (() => {
        onRequest(offset, true)
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
        .then(createList)
    }

    const createList = (newComicsList) => {
        let ended = false; 
        if (newComicsList.length < 9){
            ended = true;
        }
        setComicsList(comics => [...comics, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(ComicsEnded => ended);
    }

    function renderItems (arr) {
        
        const items = arr.map((item, i) => {
            const {title, thumbnail, price} = item;
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
  
        return ( 
                <ul className="comics__grid">
                    {items} 
                </ul> 
        ) 
    }
    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null; 
   
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
                {items} 
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;