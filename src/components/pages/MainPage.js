import { useState } from 'react';
import decoration from '../../resources/img/vision.png';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import ErrorBoundary from '../errorBoundary/ErorrBoundary';
import RandomChar from '../randomChar/RandomChar';

const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	const onSelectChar = id => {
		setSelectedChar(id);
	};

	return (
		<>
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
		</>
	);
};

export default MainPage;
