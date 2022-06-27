import {useState, useEffect} from'react';
import {PropTypes} from 'prop-types';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
 
    const [char, setChar] = useState (null);
 
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect (() => {
        updateChar();
    }, [props.charId])
  
    const updateChar = () => {  
        const {charId} = props; 
        if (!charId) {
            return;
        } 
            clearError();
            getCharacter(charId) 
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }
  
    const onCharLoaded = (char) => {  
        setChar (char);  
    }
   
        return (
            <div className="char__info"> 
                {setContent(process, View, char)}
            </div>
            
        ) 
}


const View = ({data}) => {
    const { name, description, thumbnail, thumbnailPath, homepage, wiki, comics } = data;
    const comicsSlice = comics.slice(0,10); 
    const comicsList = comicsSlice.length > 0 ? <ComicsList comics={comicsSlice}/> : 'There is no comics here';
    let tempImg = thumbnailPath.substring(thumbnailPath.lastIndexOf('/') + 1) === 'image_not_available'
    let containStyle = tempImg ? 'contain' : '';
    return(
        <>
             <div className="char__basics"> 
                    <img className={`${containStyle}`} src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                {description}</div>
                {comicsList}
        </>
    )
}


const ComicsList = ({comics}) => {


        return(
            <>
            <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    { 
                        comics.map((item, i) => {
                            return(
                               <li key={i} className="char__comics-item">
                                    {item.name}
                                </li> 
                            )
                              
                        })
                    } 
                </ul>
            </>
        )
}


CharInfo.propTypes = {
    charId: PropTypes.number
}


export default CharInfo;