import { Component } from 'react';
import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';

import decoration from '../../resources/img/vision.png';

class App extends Component {
	state = {
		selectedChar: null,
	};

	onSelectChar = id => {
		this.setState({ selectedChar: id });
	};

	render() {
		return (
			<div className="app">
				<AppHeader />
				<main>
					<RandomChar />
					<div className="char__content">
						<CharList onSelectChar={this.onSelectChar} />
						<CharInfo selectedChar={this.state.selectedChar} />
					</div>
					<img className="bg-decoration" src={decoration} alt="vision" />
				</main>
			</div>
		);
	}
}

export default App;
