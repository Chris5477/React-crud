import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";
import AddTutorial from "./components/Add-tutorial";
import TutorialsList from "./components/Tutorial-list";
import Tutorial from "./components/Tutorial"
import LogoCompany from "./assets/logo.png"

function App() {
	return (
		<div className="App">
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<a href="/tutorials" className="navbar-brand">
					<img src={LogoCompany} alt="company" width={100}  />
				</a>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/tutorials"} className="nav-link">
							Tutorials
						</Link>
					</li>
					<li className="nav-item">
						<Link to={"/add"} className="nav-link">
							Add
						</Link>
					</li>
				</div>
			</nav>
			<div className="container mt-3">
				<Routes>
					<Route path={"/tutorials"} element={<TutorialsList />} />
					<Route exact path="/add" element={<AddTutorial />} />
					<Route path="/tutorials/:id" element={<Tutorial />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
