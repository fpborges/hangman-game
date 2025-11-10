import { useState, useEffect, useCallback } from "react";
import wordCategoriesList from "./wordCategoriesList.json";
import type { WordCategories } from "./types";
import ForcaDrawing from "./components/ForcaDrawing";
import ForcaWord from "./components/ForcaWord";
import ForcaKeyboard from "./components/ForcaKeyboard";
import "./App.css";

// Type assertion for the imported JSON
const categories = wordCategoriesList as WordCategories;

function getWordAndCategory(): [string, string] {
	// Get random category first
	const categoryKeys = Object.keys(categories) as (keyof WordCategories)[];
	const randomCategory =
		categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

	// Get random word from that category
	const wordsInCategory = categories[randomCategory];
	const randomWord =
		wordsInCategory[Math.floor(Math.random() * wordsInCategory.length)];

	return [randomWord.toUpperCase(), randomCategory.toUpperCase()];
}

function App() {
	const [gameState, setGameState] = useState(() => {
		// Select a random word and its category at the start of the game
		const [word, category] = getWordAndCategory();
		return {
			wordToGuess: word,
			category: category,
		};
	});

	const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // Letters guessed by the player
	const incorrectLetters = guessedLetters.filter(
		(letter) => !gameState.wordToGuess.includes(letter)
	);

	const isLoser = incorrectLetters.length >= 6; // Maximum of 6 incorrect guesses
	const isWinner = gameState.wordToGuess
		.split("")
		.every((letter: string) => guessedLetters.includes(letter));

	useEffect(() => {
		if (isWinner) alert("Parabéns! Você ganhou!");
	}, [isWinner]);

	const addGuessedLetter = useCallback(
		(letter: string) => {
			if (guessedLetters.includes(letter) || isLoser || isWinner) return;
			setGuessedLetters((currentLetters) => [...currentLetters, letter]);
		},
		[guessedLetters, isWinner, isLoser]
	);

	const [showTip, setShowTip] = useState(false);

	// Add a listener for keyboard events
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key.toUpperCase();
			if (!key.match(/^[A-Z]$/)) return;
			e.preventDefault();
			addGuessedLetter(key);
		};
		document.addEventListener("keypress", handler);

		return () => {
			document.removeEventListener("keypress", handler);
		};
	}, [guessedLetters, addGuessedLetter]);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;
			if (key !== "Enter") return;
			e.preventDefault();
			const [newWord, newCategory] = getWordAndCategory();
			setGameState({ wordToGuess: newWord, category: newCategory });
			setGuessedLetters([]);
		};
		document.addEventListener("keypress", handler);

		return () => {
			document.removeEventListener("keypress", handler);
		};
	}, []);

	return (
		<main>
			<div
				style={{
					maxWidth: "800px",
					display: "flex",
					flexDirection: "column",
					margin: "2% auto",
					gap: "1rem",
					textAlign: "center",
					alignItems: "center",
				}}
			>
				<div>
					{!isWinner && !isLoser && (
						<div style={{ fontSize: "1.5rem", textAlign: "center" }}>
							Press a keyboard key to guess a letter
							<p>
								The word category is:
								<strong> {gameState.category}</strong>
							</p>
						</div>
					)}
				</div>
				<div style={{ fontSize: "2rem", textAlign: "center" }}>
					{isWinner && "Parabéns! Você ganhou!"}
					{isLoser && `Que pena! A palavra era: ${gameState.wordToGuess}`}
				</div>
				<div style={{ fontSize: "1.5rem", textAlign: "center" }}>
					<button
						style={{
							backgroundColor: "#2583ffff",
							color: "white",
							padding: "10px 20px",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}
						onClick={() => {
							setShowTip(!showTip);
						}}
					>
						{showTip ? "Hide Tip" : "Get a tip"}
					</button>
					{showTip && (
						<span className="givetip" style={{ marginLeft: "10px" }}>
							(Tip: {gameState.category})
						</span>
					)}
				</div>
				<div style={{ fontSize: "1.5rem", textAlign: "center" }}>
					<button
						style={{
							backgroundColor: "#4CAF50",
							color: "white",
							padding: "10px 20px",
							border: "none",
							borderRadius: "5px",
							cursor: "pointer",
						}}
						onClick={() => {
							setShowTip(false);
							const [newWord, newCategory] = getWordAndCategory();
							setGameState({ wordToGuess: newWord, category: newCategory });
							setGuessedLetters([]);
						}}
					>
						Play New Game or Press Enter
					</button>
				</div>
				<ForcaDrawing numberOfGuesses={incorrectLetters.length} />
				<ForcaWord
					reveal={isLoser}
					wordToGuess={gameState.wordToGuess}
					guessedLetters={guessedLetters}
				/>
				<div style={{ alignSelf: "stretch" }}>
					<ForcaKeyboard
						disabled={isWinner || isLoser}
						activeLetters={guessedLetters.filter((letter) =>
							gameState.wordToGuess.includes(letter)
						)}
						inactiveLetters={incorrectLetters}
						addGuessedLetter={addGuessedLetter}
					/>
				</div>
			</div>
		</main>
	);
}

export default App;
