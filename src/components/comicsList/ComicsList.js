import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarvelService } from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {
	const { loading, error, getAllComics } = useMarvelService();

	const [comicsList, setComicsList] = useState([]);
	const [offset, setOffset] = useState(100);
	const [comicsListEmpty, setComicsListEmpty] = useState(false);
	const [newItemsLoading, setNewItemsLoading] = useState(true);

	useEffect(() => onRequest(), []);

	const onRequest = offset => {
		setNewItemsLoading(false);
		getAllComics(offset).then(onComicsListLoaded);
	};

	const onComicsListLoaded = newComicsList => {
		let comicsListEmpty = false;
		if (newComicsList.length < 8) comicsListEmpty = true;

		setComicsList(comicsList => [...comicsList, ...newComicsList]);
		setOffset(offset => offset + 9);
		setNewItemsLoading(false);
		setComicsListEmpty(comicsListEmpty);
	};

	const renderItems = data => {
		const items = data.map(({ id, title, thumbnail, prices }) => {
			return (
				<li key={id} tabIndex={0} className="comics__item">
					<Link to={`/comics/${id}`}>
						<img src={thumbnail} alt={title} className="comics__item-img" />
						<div className="comics__item-name">{title}</div>
						<div className="comics__item-price">{prices}</div>
					</Link>
				</li>
			);
		});
		return <ul className="comics__grid">{items}</ul>;
	};

	const comicItems = renderItems(comicsList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemsLoading ? <Spinner /> : null;

	return (
		<div className="comics__list">
			{spinner}
			{errorMessage}
			{comicItems}
			<button
				disabled={newItemsLoading}
				onClick={() => onRequest(offset)}
				style={{ display: comicsListEmpty ? 'none' : 'block' }}
				className="button button__main button__long"
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
