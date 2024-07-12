import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMarvelService } from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComicPage.scss';

const SingleComicPage = () => {
	const { loading, error, getComicByID, clearError } = useMarvelService();
	const [comic, setComic] = useState(null);

	const { comicId } = useParams();

	useEffect(() => updateComic(), []);
	useEffect(() => updateComic(), [comicId]);

	const onAddComic = comic => setComic(comic);

	const updateComic = () => {
		clearError();
		getComicByID(comicId).then(onAddComic);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

	return (
		<div className="single-comic">
			{errorMessage}
			{spinner}
			{content}
			<Link to="/comics" className="single-comic__back">
				Back to all
			</Link>
		</div>
	);
};

const View = ({ comic }) => {
	const { title, thumbnail, description, pageCount, language, price } = comic;

	return (
		<>
			<img src={thumbnail} alt={title} className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
		</>
	);
};

export default SingleComicPage;
