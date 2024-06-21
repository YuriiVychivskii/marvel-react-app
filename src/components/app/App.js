import { useState } from 'react';

import decoration from '../../resources/img/vision.png';
import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import ErrorBoundary from '../errorBoundary/ErorrBoundary';
import RandomChar from '../randomChar/RandomChar';

const App = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	const onSelectChar = id => {
		setSelectedChar(id);
	};

	return (
		<div className="app">
			<AppHeader />
			<main>
				<RandomChar />
				<div className="char__content">
					<ErrorBoundary>
						<CharList onSelectChar={onSelectChar} />
					</ErrorBoundary>
					<ErrorBoundary>
						<CharInfo selectedChar={selectedChar} />
					</ErrorBoundary>
				</div>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	);
};

export default App;
