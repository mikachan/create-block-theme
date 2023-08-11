import { render, createRoot } from '@wordpress/element';
import ManageFonts from './manage-fonts';
import GoogleFonts from './google-fonts';
import LocalFonts from './local-fonts';
import GitIntegrationAdminPage from './git-integration/admin'
import { ManageFontsProvider } from './fonts-context';
import './index.scss';

function App( { metadata } ) {
	const params = new URLSearchParams( document.location.search );
	const page = params.get( 'page' );

	let PageComponent = null;
	switch ( page ) {
		case 'manage-fonts':
			PageComponent = ManageFonts;
			break;
		case 'add-google-font-to-theme-json':
			PageComponent = GoogleFonts;
			break;
		case 'add-local-font-to-theme-json':
			PageComponent = LocalFonts;
			break;
		case 'themes-git-integration':
			console.log("git integraton route")
			PageComponent = GitIntegrationAdminPage;
			break;
		default:
			PageComponent = () => <h1>This page is not implemented yet.</h1>;
			break;
	}

	return (
		<ManageFontsProvider>
			<PageComponent metadata={ metadata } />
		</ManageFontsProvider>
	);
}

window.addEventListener(
	'load',
	function () {
		const domNode = document.getElementById( 'create-block-theme-app' );
		const metadata = getAppMetadata( domNode );

		// If version is less than 18 use `render` to render the app
		// otherwise use `createRoot` to render the app
		if ( createRoot === undefined ) {
			render( <App metadata={ metadata } />, domNode );
		} else {
			const root = createRoot( domNode );
			root.render( <App metadata={ metadata } /> );
		}
	},
	false
);

function getAppMetadata( rootElement ) {
	try {
		return JSON.parse( rootElement.getAttribute( 'data-metadata' ) );
	} catch ( error ) {
		return {};
	}
}