import {useState} from 'react';
import {Helmet} from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../CharSearchForm/CharSearchForm"

import ErrorBoundary from "../errorBoundary/errorBoundary";
import decoration from '../../resources/img/vision.png';

const MainPage =() => {

    const [selectedChar, setChar] = useState(null);
 
    const onCharSelected = (id) => {
        setChar(id);
    }
 

    return (
        <>
            <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
                />
            <title>Marvel information</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content alina">
                <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary> 
                        <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
                <ErrorBoundary> 
                        <CharSearchForm/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;