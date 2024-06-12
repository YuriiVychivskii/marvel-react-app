import img from './error.gif';

const ErrorMessage = () => {
	return (
		<img
			style={{
				display: 'block',
				height: 250,
				width: 250,
				objectFit: 'contain',
				margin: '0 auto',
			}}
			src={img}
			alt="error"
		/>
	);
};

export default ErrorMessage;
