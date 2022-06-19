import {useState, useEffect} from 'react';
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './randomChar.scss'; 
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
 
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

     useEffect (() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);
        return () => {
            clearInterval(timerId)
        }
     },[])
  
    const onCharLoading = () => {

        setChar(char);
        setLoading(loading => true);
    }

    const onCharLoaded = (char) => { 

        setChar(char);
        setLoading(loading => false);
        setError(error => false); 
    }

    const onError = () => { 

        setLoading(loading => false);
        setError(error => true);  
    }

    const marvelService = new MarvelService();

    const updateChar = () => { 
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading();
        marvelService
        .getCharacter(id) 
        .then(onCharLoaded) 
        .catch(onError) 
    }

 
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;


        return (
            <div className="randomchar"> 
                {errorMessage}{spinner}{content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div onClick={updateChar} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        ) 
}

const View = ({char}) => {
   
    const { name, description, thumbnail, thumbnailPath, homepage, wiki } = char;
    console.log(thumbnailPath)
    let containStyle = 'randomchar__contain';
    if (thumbnailPath !== undefined){
        let tempImg = thumbnailPath.substring(thumbnailPath.lastIndexOf('/') + 1) === 'image_not_available'
        let containStyle = tempImg ? 'randomchar__contain' : '';
    } 
    
    return(
      <div className="randomchar__block">
                <img className={`randomchar__img ${containStyle}`} src={thumbnail} alt="Random character"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description ? description : 'Sorry babe, no description here'}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
     </div>  
    )

}

export default RandomChar;