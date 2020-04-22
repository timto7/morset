import React from "react";
import "./InfoModal.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	button: {
		shadow: 0,
		"&": {
			boxShadow: "none !important"
		},
		"&:hover": {
			backgroundColor: "#2980b9 !important",
			boxShadow: "none !important"
		},
		fontSize: "16px",
		letterSpacing: "1px",
		fontWeight: "600",
		margin: "none"
	}
}));

const InfoModal = ({visible, close}) => {
	const classes = useStyles();

	return (
		<div id="infoModalBG" className={`${visible ? "visible" : ""}`} onClick={() => close()}>
			<div id="infoModalContainer" onClick={event => {
				event.stopPropagation();
			}}>
				<div id="infoModalContent">
					<div id="infoLogoContainer">
						<div id="infoLogo" />
					</div>
					<span id="infoVersion">Version: 1.2.1</span>
					<div id="infoDoneBtnContainer">
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={() => close()}
						>
							<span>Done</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
};

export default InfoModal;
