import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";
import ModalConfirmation from "./Modal-confirmation";
const TutorialsList = () => {
	const [tutorials, setTutorials] = useState([]);
	const [currentTutorial, setCurrentTutorial] = useState(null);
	const [visibilityModal, setVisibilityModal] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchTitle, setSearchTitle] = useState("");
	useEffect(() => {
		retrieveTutorials();
	}, []);

	const showWarning = () => {
		setVisibilityModal(true);
	};

	const onChangeSearchTitle = (e) => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	};
	const retrieveTutorials = () => {
		TutorialDataService.getAll()
			.then((response) => {
				setTutorials(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	const refreshList = () => {
		retrieveTutorials();
		setCurrentTutorial(null);
		setCurrentIndex(-1);
	};
	const setActiveTutorial = (tutorial, index) => {
		setCurrentTutorial(tutorial);
		setCurrentIndex(index);
	};
	const removeAllTutorials = () => {
		TutorialDataService.deleteAll()
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const deleteTutorial = (idTutorial) => {
		TutorialDataService.delete(idTutorial)
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((e) => console.log(e));
	};
	const findByTitle = () => {
		TutorialDataService.findByTitle(searchTitle)
			.then((response) => {
				setTutorials(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<div className="list row">
			{visibilityModal && (
				<ModalConfirmation closeModal={() => setVisibilityModal(false)} deleteAllTutorial={removeAllTutorials} />
			)}
			<div className="col-md-8">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Search by title"
						value={searchTitle}
						onChange={onChangeSearchTitle}
					/>
					<div className="input-group-append">
						<button className="btn btn-outline-secondary" type="button" onClick={findByTitle}>
							Search
						</button>
					</div>
				</div>
			</div>
			<div className="col-md-6">
				<h4>Tutorials List</h4>
				<ul className="list-group">
					{tutorials &&
						tutorials.map((tutorial, index) => (
							<li
								className={"list-group-item " + (index === currentIndex ? "active" : "")}
								onClick={() => setActiveTutorial(tutorial, index)}
								key={index}
							>
								{tutorial.title}
							</li>
						))}
				</ul>
				<button className="m-3 btn btn-sm btn-danger" onClick={showWarning}>
					Remove All
				</button>
			</div>
			<div className="col-md-6">
				{currentTutorial ? (
					<div>
						<h4>Tutorial</h4>
						<div>
							<label>
								<strong>Title:</strong>
							</label>{" "}
							{currentTutorial.title}
						</div>
						<div>
							<label>
								<strong>Description:</strong>
							</label>{" "}
							{currentTutorial.description}
						</div>
						<div>
							<label>
								<strong>Status:</strong>
							</label>{" "}
							{currentTutorial.published ? "Published" : "Pending"}
						</div>
						<Link to={"/tutorials/" + currentTutorial.id} className="btn btn-warning">
							Edit
						</Link>
						<button className="m-3 btn btn-sm btn-danger" onClick={() => deleteTutorial(currentTutorial.id)}>
							Delete
						</button>
					</div>
				) : (
					<div>
						<br />
						<p>Please click on a Tutorial...</p>
					</div>
				)}
			</div>
		</div>
	);
};
export default TutorialsList;
