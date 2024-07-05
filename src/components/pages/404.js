import { Link } from 'react-router-dom';

const Page404 = () => {
	return (
		<div style={{ textAlign: 'center', padding: '50px' }}>
			<h2 style={{ fontSize: '2em', color: '#333', marginBottom: 15 }}>
				Lost your way?
			</h2>
			<p style={{ fontSize: '1.2em', color: '#666', marginBottom: 15 }}>
				Sorry, we can't find that page. You'll find loads to explore on the home
				page.
			</p>

			<Link
				to="/"
				style={{
					fontSize: '1.2em',
					color: '#9F0013',
					textDecoration: 'underline',
				}}
			>
				Go home page
			</Link>
		</div>
	);
};

export default Page404;
