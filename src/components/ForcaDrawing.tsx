const HEAD = (
	<div
		style={{
			width: "50px",
			height: "50px",
			borderRadius: "100%",
			border: "10px solid black",
			position: "absolute",
			top: "50px",
			right: "-30px",
		}}
	/>
);

const BODY = (
	<div
		style={{
			width: "10px",
			height: "100px",
			background: "black",
			position: "absolute",
			top: "120px",
			right: "0px",
		}}
	/>
);

const RIGHT_ARM = (
	<div
		style={{
			width: "80px",
			height: "10px",
			background: "black",
			position: "absolute",
			top: "150px",
			right: "-80px",
			rotate: "-30deg",
			transformOrigin: "left bottom",
		}}
	/>
);

const LEFT_ARM = (
	<div
		style={{
			width: "80px",
			height: "10px",
			background: "black",
			position: "absolute",
			top: "150px",
			right: "10px",
			rotate: "30deg",
			transformOrigin: "right bottom",
		}}
	/>
);

const RIGHT_LEG = (
	<div
		style={{
			width: "100px",
			height: "10px",
			background: "black",
			position: "absolute",
			top: "210px",
			right: "-90px",
			rotate: "60deg",
			transformOrigin: "left bottom",
		}}
	/>
);

const LEFT_LEG = (
	<div
		style={{
			width: "100px",
			height: "10px",
			background: "black",
			position: "absolute",
			top: "210px",
			right: "0px",
			rotate: "-60deg",
			transformOrigin: "right bottom",
		}}
	/>
);

const BODY_PARTS = [
	{ key: "head", component: HEAD },
	{ key: "body", component: BODY },
	{ key: "rightArm", component: RIGHT_ARM },
	{ key: "leftArm", component: LEFT_ARM },
	{ key: "rightLeg", component: RIGHT_LEG },
	{ key: "leftLeg", component: LEFT_LEG },
];

type ForcaDrawingProps = {
	numberOfGuesses: number;
};

export default function ForcaDrawing({ numberOfGuesses }: ForcaDrawingProps) {
	return (
		<div style={{ position: "relative" }}>
			{BODY_PARTS.slice(0, numberOfGuesses).map(({ key, component }) => (
				<div key={key}>{component}</div>
			))}
			<div
				style={{
					height: "50px",
					width: "10px",
					background: "black",
					position: "absolute",
					top: 0,
					right: 0,
				}}
			/>
			<div
				style={{
					height: "10px",
					width: "220px",
					background: "black",
					marginLeft: "120px",
				}}
			/>
			<div
				style={{
					height: "350px",
					width: "10px",
					background: "black",
					marginLeft: "120px",
				}}
			/>
			<div style={{ height: "10px", width: "250px", background: "black" }} />
		</div>
	);
}
