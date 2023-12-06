/** @format */

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add_dedication } from "../../features/brick/brickSlice";
import { insertDedication } from "../../actions/brick";

import { FaAnglesRight } from "react-icons/fa6";
import user from "../../assets/img/user.png";

const DedicationForm = ({ handleNextModal, brick_id }) => {
	//Declear States for Dedication Form
	const [name, setName] = useState("");
	const [relationship, setRelationship] = useState("");
	const [message, setMessage] = useState("");
	const [image, setImage] = useState();
	//Get Dedication data from Redux for display when redirect
	const { dedication } = useSelector((state) => state.brick.brick);

	useEffect(() => {
		setName(dedication.name);
		setRelationship(dedication.relationship);
		setMessage(dedication.message);
		setImage(dedication.image);
	}, []);

	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		const dedicationData = {
			name,
			relationship,
			message,
			image,
			// : JSON.stringify(image)
		};
		dispatch(add_dedication(dedicationData));
		// dispatch(
		// 	insertDedication({
		// 		brick_id,
		// 		name,
		// 		relationship,
		// 		message,
		// 	})
		// );
		handleNextModal();
	};

	function getBase64(file) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			console.log(reader.result);
		};
		reader.onerror = function (error) {
			console.log("Error: ", error);
		};
	}

	return (
		<>
			<p className="text-4xl font-montserrat px-8">Just one more step!</p>
			<p className="font-raleway text-xl my-4">Why we need this?</p>
			<p className="font-raleway text-xl my-4">
				You have taken a step towards making a significant difference!
			</p>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2"
				placeholder="I dedicate this brick to(name)"
			/>
			<input
				value={relationship}
				onChange={(e) => setRelationship(e.target.value)}
				className="border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2"
				placeholder="who is my"
			/>
			<textarea
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				className="border border-gray-400 rounded-lg w-2/3 my-2 px-4 py-2 h-36"
				placeholder="Dedication Message"
			/>
			<div className="border border-gray-400 w-2/3 rounded-lg my-2 px-4 py-2">
				{image ? (
					<div className="flex flex-col w-full items-center justify-between gap-y-3">
						<img
							alt="not found"
							class="w-20 h-20 rounded-full"
							src={URL.createObjectURL(image)}
						/>
						<button onClick={() => setImage(null)}>Remove</button>
					</div>
				) : (
					<div className="flex flex-col w-full items-center justify-between gap-y-3">
						<input
							className="w-full"
							type="file"
							name="myImage"
							onChange={(event) => {
								setImage(event.target.files[0]);
							}}
						/>
						<img
							className="w-20 h-20 rounded-full"
							src={user}
							alt="dedication image"
						></img>
					</div>
				)}
			</div>
			<button
				className="text-gray-100 bg-red-700 px-4 py-2 my-4 rounded-md"
				onClick={handleSubmit}
			>
				<span className="flex flex-row items-center justify-between gap-x-3">
					SAVE DEDICATION
					<FaAnglesRight />
				</span>
			</button>
		</>
	);
};

export default DedicationForm;