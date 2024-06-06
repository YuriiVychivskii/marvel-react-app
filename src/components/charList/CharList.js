import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {
	state = {
		charList: [],
	};

	componentDidMount() {
		this.getCharacters();
	}

	marvelService = new MarvelService();

	getCharacters = () => {
		this.marvelService.getAllCharacters().then(data => {
			const charList = data.map(({ name, thumbnail }, id) => {
				return (
					<li
						key={id}
						className="char__item"
						onMouseEnter={this.onMouseEnter}
						onMouseLeave={this.onMouseLeave}
					>
						<img src={thumbnail} alt="abyss" />
						<div className="char__name">{name}</div>
					</li>
				);
			});
			this.setState({ charList });
		});
	};

	onMouseEnter = e => {
		e.currentTarget.classList.add('char__item_selected');
	};
	onMouseLeave = e => {
		e.currentTarget.classList.remove('char__item_selected');
	};

	render() {
		const { charList } = this.state;
		return (
			<div className="char__list">
				<ul className="char__grid">{charList}</ul>
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

//char__item_selected

export default CharList;
