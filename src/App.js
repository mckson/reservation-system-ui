import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SignUp from './Models/Components/SignUp';
import SignIn from './Models/Components/SignIn';
import Navbar from './Common/Navbar';

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<nav>
					<ul>
						<li>
							<Link to='/SignIn'>Sign in</Link>
						</li>
						<li>
							<Link to='/SignUp'>Sign up</Link>
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path='/SignIn'>
						<SignIn />
					</Route>
					<Route path='/SignUp'>
						<SignUp />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
