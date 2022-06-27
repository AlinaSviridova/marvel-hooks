import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {request, clearError, process, setProcess} = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const  _apiKey = 'apikey=7e218a62ee6da0dcd851c113e2e277eb';
//    const _apiKey = 'apikey=bd19ba0a0373b6d52ce8b100dfe07355';
   const _baseOffset = 210;

    

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {  
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter( res.data.results[0]);
    }
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }
    const getComic = async (id) => {  
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics( res.data.results[0]);
    }
    const _transformCharacter = (char) => {
        return{
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnailPath: char.thumbnail.path,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }
    const _transformComics = (comics) => {
        return{
            id: comics.id,
            title: comics.title,
            description: comics.description,
            thumbnailPath: comics.thumbnail.path,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No info about the number of pages',
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}` : 'not avaliable'
        }
    }

    return {clearError, process, setProcess, getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName}
}


export default useMarvelService;