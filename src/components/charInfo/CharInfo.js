import {Component} from'react';
import {PropTypes} from 'prop-types';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Skeleton from '../skeleton/Skeleton' 
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component{

    state = {
        char: null,
        loading : false,
        error: false
    }

    marvelService = new MarvelService();


    componentDidMount() { 
        this.updateChar();
    }
    componentDidUpdate(prevProps, prevState) {
       
       if (this.props.charId !== prevProps.charId) {
        this.updateChar();
       } 
    }


    updateChar = () => {  
        const {charId} = this.props; 
        if (!charId) {
            return;
        } 
        this.onCharLoading();
        this.marvelService
            .getCharacter(charId) 
            .then(this.onCharLoaded) 
            .catch(this.onError) 
    }




    onCharLoading = ( ) => { 
        this.setState({ 
            loading : true
        })
    }
    onCharLoaded = (char) => {  
        this.setState({
            char,
            loading : false,
            error: false
        })
    }

    onError = () => { 
        this.setState({ 
            loading : false,
            error: true
        })
    }



    render(){

        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
            
        )
    }
}


const View = ({char}) => {
    const { name, description, thumbnail, thumbnailPath, homepage, wiki, comics } = char;
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