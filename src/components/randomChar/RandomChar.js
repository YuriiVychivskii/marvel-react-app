import { Component } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import ErrorMassage from '../errorMassage/ErrorMassage';
import Spinner from '../spinner/Spinner';
import './randomChar.scss';

class RandomChar extends Component {
	state = {
		char: {},
		loading: true,
		error: false,
	};

	componentDidMount() {
		this.getRandomChar();
	}

	marvelService = new MarvelService();

	onAddChar = char => {
		this.setState({ char, loading: false });
	};

	onAddSpinner = () => {
		this.setState({ loading: true });
	};

	onError = () => {
		this.setState({ loading: false, error: true });
	};

	getRandomChar = () => {
		this.onAddSpinner();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.marvelService
			.getCharacterByID(id)
			.then(this.onAddChar)
			.catch(this.onError);
	};
	render() {
		const { char, loading, error } = this.state;
		const spinner = loading ? <Spinner /> : null;
		const errorMassage = error ? <ErrorMassage /> : null;
		const content = !(loading || error) ? <View char={char} /> : null;

		return (
			<div className="randomchar">
				{spinner}
				{errorMassage}
				{content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!
						<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">Or choose another one</p>
					<button onClick={this.getRandomChar} className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		);
	}
}

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
