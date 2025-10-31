type ForcaWordProps = {
	wordToGuess: string;
	guessedLetters: string[];
	reveal?: boolean;
};

export default function ForcaWord({
	wordToGuess,
	guessedLetters,
	reveal = false,
}: ForcaWordProps) {
	return (
		<div
			style={{
				display: "flex",
				gap: ".25em",
				fontSize: "6rem",
				fontWeight: "bold",
				textTransform: "uppercase",
				fontFamily: "monospace",
			}}
		>
			{wordToGuess.split("").map((letter, index) => (
				<div
					style={{
						borderBottom: "4px solid black",
						width: "1em",
						textAlign: "center",
					}}
				>
					<span
						key={index}
						style={{
							borderBottom: "4px solid black",
							width: "1em",
							textAlign: "center",
							visibility:
								guessedLetters.includes(letter) || reveal
									? "visible"
									: "hidden",
							color:
								!guessedLetters.includes(letter) && reveal ? "red" : "black",
						}}
					>
						{letter}
					</span>
				</div>
			))}
		</div>
	);
}
