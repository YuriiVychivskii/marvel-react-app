import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';

import './charInfo.scss';

const CharInfo = ({ selectedChar }) => {
	const [char, setChar] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const marvelService = new MarvelService();

	useEffect(() => updateChar(), []);

	useEffect(() => updateChar(), [selectedChar]);

	const onAddChar = char => {
		setChar(char);
		setLoading(false);
	};

	const onAddSpinner = () => {
		setLoading(true);
	};

	const onError = () => {
		setLoading(false);
		setError(true);
	};

	const updateChar = () => {
		if (!selectedChar) {
			setChar(null);
			return;
		}

		onAddSpinner();
		marvelService.getCharacterByID(selectedChar).then(onAddChar).catch(onError);
	};

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{skeleton}
			{spinner}
			{errorMessage}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
	let imgStyle =
		thumbnail ===
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			? { objectFit: 'unset' }
			: { objectFit: 'cover' };
	return (
		<>
			<div className="char__basics">
				<img style={imgStyle} src={thumbnail} alt={name} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length ? (
					comics
						.map((item, i) => (
							<li key={i} className="char__comics-item">
								{item.name}
							</li>
						))
						.slice(0, 10)
				) : (
					<li className="char__comics-item">
						No comics found for this character...
					</li>
				)}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	selectedChar: PropTypes.number,
};

export default CharInfo;
