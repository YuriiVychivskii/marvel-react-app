import { useHttp } from '../hooks/http.hook';

export const useMarvelService = () => {
	const { loading, error, request, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com/v1/public/';
	const _apiKey =
		'apikey=b385361f7e9b608aa0a767131dfa968e&hash=9c035c0ddd58115d76cf41112b2af2f8';
	const _offsetChar = 210;
	const _offsetComic = 100;

	const getAllCharacters = async (offset = _offsetChar) => {
		const res = await request(
			`${_apiBase}characters?ts=1&limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(item => _transformCharacter(item));
	};

	const getCharacterByID = async id => {
		const res = await request(`${_apiBase}characters/${id}?ts=1&${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = _offsetComic) => {
		const res = await request(
			`${_apiBase}comics?ts=1&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(item => _transformComic(item));
	};

	const getComicByID = async id => {
		const res = await request(`${_apiBase}comics/${id}?ts=1&${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const _transformCharacter = ({
		id,
		name,
		description,
		thumbnail,
		urls,
		comics,
	}) => {
		return {
			id: id,
			name: name,
			description: description
				? `${description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: thumbnail.path + '.' + thumbnail.extension,
			homepage: urls[0].url,
			wiki: urls[1].url,
			comics: comics.items,
		};
	};

	const _transformComic = ({
		id,
		title,
		thumbnail,
		prices,
		description,
		pageCount,
		textObjects,
	}) => {
		return {
			id: id,
			title: title,
			description: description || 'There is no description for this comics',
			thumbnail: thumbnail.path + '.' + thumbnail.extension,
			prices: prices[0].price ? `${prices[0].price}$` : 'not available',
			pageCount: pageCount
				? `${pageCount} p.`
				: 'No information about the number of pages',
			language: textObjects[0]?.language || 'en-us',
		};
	};

	return {
		loading,
		error,
		clearError,
		getAllCharacters,
		getCharacterByID,
		getAllComics,
		getComicByID,
	};
};
