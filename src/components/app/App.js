import { Component } from 'react';
import decoration from '../../resources/img/vision.png';
import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import ErrorBoundary from '../errorBoundary/ErorrBoundary';
import RandomChar from '../randomChar/RandomChar';

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
						<ErrorBoundary>
							<CharList onSelectChar={this.onSelectChar} />
						</ErrorBoundary>
						<ErrorBoundary>
							<CharInfo selectedChar={this.state.selectedChar} />
						</ErrorBoundary>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision" />
				</main>
			</div>
		);
	}
}

export default App;
