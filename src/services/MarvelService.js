class MarvelService {
	_apiBase = 'http://gateway.marvel.com/v1/public/';
	_apiKey =
		'apikey=b385361f7e9b608aa0a767131dfa968e&hash=9c035c0ddd58115d76cf41112b2af2f8';

	getResource = async url => {
		const res = await fetch(url);
		if (!res.ok) {
			throw Error(`Cloud not fetch url: ${url} staus: ${res.status}`);
		}
		return res.json();
	};

	getAllCharacters = async () => {
		return await this.getResource(
			`${this._apiBase}characters?ts=1&limit=9&offset=210&${this._apiKey}`
		).then(data =>
			data.data.results.map(item => this._transformCharacter(item))
		);
	};

	getCharacterByID = async id => {
		return await this.getResource(
			`${this._apiBase}characters/${id}?ts=1&${this._apiKey}`
		).then(data => this._transformCharacter(data.data.results[0]));
	};

	_transformCharacter = ({ id, name, description, thumbnail, urls }) => {
		return {
			id: id,
			name: name,
			description: description
				? `${description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: thumbnail.path + '.' + thumbnail.extension,
			homepage: urls[0].url,
			wiki: urls[1].url,
		};
	};
}

export default MarvelService;
