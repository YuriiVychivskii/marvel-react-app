import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';

class CharList extends Component {
	state = {
		charList: [],
		loading: true,
		error: false,
		offset: 219,
		newItemsLoading: true,
	};

	marvelService = new MarvelService();

	componentDidMount() {
		this.marvelService
			.getAllCharacters()
			.then(this.onCharListLoaded)
			.catch(this.onError);
	}

	onRequest = offset => {
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError);
	};

	onCharListLoaded = newCharList => {
		this.setState(({ charList, offset }) => {
			const combinedList = [...charList, ...newCharList];
			const uniqueCharList = combinedList.filter(
				(character, index, self) =>
					index === self.findIndex(c => c.id === character.id)
			);

			return {
				charList: uniqueCharList,
				loading: false,
				offset: offset + 9,
				newItemsLoading: false,
			};
		});
	};

	onCharListLoading = () => {
		this.setState({ newItemsLoading: true });
	};

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		});
	};

	onActive = (e, id) => {
		this.props.onSelectChar(id);

		if (e.currentTarget.classList.contains('char__item_selected')) {
			e.currentTarget.classList.remove('char__item_selected');

			this.props.onSelectChar(0);
		} else {
			document
				.querySelectorAll('.char__item')
				.forEach(item => item.classList.remove('char__item_selected'));

			e.currentTarget.classList.add('char__item_selected');
		}
	};

	renderItems(data) {
		const items = data.map(({ name, thumbnail, id }) => {
			let imgStyle =
				thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
					? { objectFit: 'unset' }
					: { objectFit: 'cover' };

			return (
				<li className="char__item" key={id} onClick={e => this.onActive(e, id)}>
					<img src={thumbnail} alt={name} style={imgStyle} />
					<div className="char__name">{name}</div>
				</li>
			);
		});
		return <ul className="char__grid">{items}</ul>;
	}

	render() {
		const { charList, loading, error, newItemsLoading, offset } = this.state;

		const items = this.renderItems(charList);

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
					onClick={() => this.onRequest(offset)}
					className="button button__main button__long"
				>
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharList;
