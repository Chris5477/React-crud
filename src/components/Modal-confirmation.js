import { createPortal } from "react-dom";
import { useEffect } from "react";

const ModalConfirmation = ({ closeModal, deleteAllTutorial }) => {
	useEffect(() => {
		document.querySelectorAll(".close-btn").forEach((btn) => btn.addEventListener("click", closeModal));

		return () => document.querySelectorAll("button").forEach((btn) => btn.removeEventListener("click", closeModal));
	});

	const validateDeleteallTutorial = () => {
		deleteAllTutorial();
		closeModal();
	};

	return createPortal(
		<div className="modal-confirmation">
			<div className="modal-confirmation-content">
				<div className="modal-confirmation-header">
					<h2 className="">Confirmation</h2>
					<button className="close-btn btn btn-primary">X</button>
				</div>
				<p>Attention, Vous êtes sur le point de supprimer toutes les données.</p>
				<div className="btns-container">
					<button className="btn btn-danger" onClick={validateDeleteallTutorial}>
						Oui
					</button>
					<button className="close-btn btn btn-primary">Non</button>
				</div>
			</div>
		</div>,
		document.body
	);
};
export default ModalConfirmation;
