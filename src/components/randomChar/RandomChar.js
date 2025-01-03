import { useEffect, useState } from 'react';

import mjolnir from '../../resources/img/mjolnir.png';

import { useMarvelService } from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';

const RandomChar = () => {
	const { loading, error, getCharacterByID, clearError } = useMarvelService();
	const [char, setChar] = useState({});

	useEffect(() => getRandomChar(), []);

	const onAddChar = char => setChar(char);

	const getRandomChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacterByID(id).then(onAddChar);
	};

	const spinner = loading ? <Spinner /> : null;
	const errorMessage = error ? <ErrorMessage /> : null;
	const content = !(loading || error) ? <View char={char} /> : null;

	return (
		<div className="randomchar">
			{spinner}
			{errorMessage}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">Or choose another one</p>
				<button onClick={getRandomChar} className="button button__main">
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;
	const imgStyle =
		thumbnail ===
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			? { objectFit: 'unset' }
			: { objectFit: 'cover' };

	return (
		<div className="randomchar__block">
			<img
				src={thumbnail}
				style={imgStyle}
				alt="Random character"
				className="randomchar__img"
			/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomChar;
