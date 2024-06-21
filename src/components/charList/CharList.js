import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = props => {
	const [charList, setCharList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [offset, setOffset] = useState(210);
	const [newItemsLoading, setNewItemsLoading] = useState(true);
	const [charListEmpty, setCharListEmpty] = useState(false);

	const marvelService = new MarvelService();

	useEffect(() => onRequest(), []);

	const onRequest = offset => {
		onCharListLoading();
		marvelService
			.getAllCharacters(offset)
			.then(onCharListLoaded)
			.catch(onError);
	};

	const onCharListLoaded = newCharList => {
		let charListEmpty = false;
		if (newCharList.length < 9) {
			charListEmpty = true;
		}

		const combinedList = [...charList, ...newCharList];
		const uniqueCharList = combinedList.filter(
			(character, index, self) =>
				index === self.findIndex(c => c.id === character.id)
		);

		setCharList(uniqueCharList);
		setLoading(false);
		setOffset(offset => offset + 9);
		setNewItemsLoading(false);
		setCharListEmpty(charListEmpty);
	};

	const onCharListLoading = () => {
		setNewItemsLoading(true);
	};

	const onError = () => {
		setError(true);
		setLoading(false);
	};

	const itemsRef = useRef([]);

	const onActive = i => {
		if (itemsRef.current[i].classList.contains('char__item_selected')) {
			props.onSelectChar(null);
			itemsRef.current[i].classList.remove('char__item_selected');
		} else {
			itemsRef.current.forEach(item =>
				item.classList.remove('char__item_selected')
			);
			itemsRef.current[i].classList.add('char__item_selected');
			itemsRef.current[i].focus();
		}
	};

	const checkTabPress = (event, key_val) => {
		if (event.keyCode === 9) onActive(key_val);
	};

	const renderItems = data => {
		const items = data.map(({ name, thumbnail, id }, i) => {
			let imgStyle =
				thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
					? { objectFit: 'unset' }
					: { objectFit: 'cover' };

			return (
				<li
					className="char__item"
					key={id}
					onClick={() => {
						props.onSelectChar(id);
						onActive(i);
					}}
					ref={el => (itemsRef.current[i] = el)}
					tabIndex={0}
					onKeyUp={e => {
						props.onSelectChar(id);
						checkTabPress(e, i);
					}}
				>
					<img src={thumbnail} alt={name} style={imgStyle} />
					<div className="char__name">{name}</div>
				</li>
			);
		});
		return <ul className="char__grid">{items}</ul>;
	};
	const items = renderItems(charList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? items : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{content}
			<button
				disabled={newItemsLoading}
				style={{ display: charListEmpty ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}
				className="button button__main button__long"
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

CharList.propTypes = {
	onSelectChar: PropTypes.func.isRequired,
};

export default CharList;
