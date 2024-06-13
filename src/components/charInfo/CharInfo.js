import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import './charInfo.scss';

class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedChar !== this.props.selectedChar) {
			this.updateChar();
		}
	}

	onAddChar = char => {
		this.setState({ char, loading: false });
	};

	onAddSpinner = () => {
		this.setState({ loading: true });
	};

	onError = () => {
		this.setState({ loading: false, error: true });
	};

	updateChar = () => {
		const { selectedChar } = this.props;

		if (!selectedChar) {
			this.setState({ char: null });
			return;
		}

		this.onAddSpinner();
		this.marvelService
			.getCharacterByID(selectedChar)
			.then(this.onAddChar)
			.catch(this.onError);
	};

	render() {
		const { char, loading, error } = this.state;
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
	}
}

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
export default CharInfo;
