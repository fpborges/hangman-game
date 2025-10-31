import styles from "../keyboard.module.css";

const KEYS = [
	["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
	["A", "S", "D", "F", "G", "H", "J", "K", "L"],
	["Z", "X", "C", "V", "B", "N", "M"],
];

type ForcaKeyboardProps = {
	disabled: boolean;
	activeLetters: string[];
	inactiveLetters: string[];
	addGuessedLetter: (letter: string) => void;
};

export default function ForcaKeyboard({
	disabled = false,
	activeLetters,
	inactiveLetters,
	addGuessedLetter,
}: ForcaKeyboardProps) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
				gap: ".5rem",
			}}
		>
			{KEYS.flat().map((key) => {
				const isActive = activeLetters.includes(key);
				const isInactive = inactiveLetters.includes(key);
				return (
					<button
						onClick={() => addGuessedLetter(key)}
						className={`${styles.btn}${isActive ? ` ${styles.active}` : ""}${
							isInactive ? ` ${styles.inactive}` : ""
						}`}
						disabled={isActive || isInactive || disabled}
						key={key}
					>
						{key}
					</button>
				);
			})}
		</div>
	);
}
