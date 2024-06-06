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
			data.data.results.map(item => this._TransformedCharacter(item))
		);
	};

	getCharacterByID = async id => {
		return await this.getResource(
			`${this._apiBase}characters/${id}?ts=1&${this._apiKey}`
		).then(data => this._TransformedCharacter(data.data.results[0]));
	};

	_TransformedCharacter = data => {
		return {
			name: data.name,
			description:
				(data.description.length > 210
					? `${data.description.slice(0, 210)}...`
					: data.description) || 'No information was found for this character',
			thumbnail: `${data.thumbnail.path}.${data.thumbnail.extension}`,
			homepage: data.urls[0].url,
			wiki: data.urls[1].url,
		};
	};
}

export default MarvelService;
