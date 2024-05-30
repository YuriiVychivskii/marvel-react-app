class MarvelService {
	_apiBase = 'http://gateway.marvel.com/v1/public/';
	_apiKey =
		'apikey=b385361f7e9b608aa0a767131dfa968e&hash=9c035c0ddd58115d76cf41112b2af2f8';

	getResource = async url => {
		const data = await fetch(url);
		if (!data.ok) {
			throw Error(`Cloud not fetch: ${url}; status: ${data.status}`);
		}
		return data.json();
	};

	getAllCharacters = () => {
		return this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&ts=1&${this._apiKey}`
		);
	};

	getCharacterById = id => {
		return this.getResource(
			`${this._apiBase}characters/${id}?ts=1&apikey=${this._apiKey}`
		);
	};
}

export default MarvelService;
