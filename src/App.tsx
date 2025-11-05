import { useState, useEffect, useCallback } from "react";
import wordCategoriesList from "./wordCategoriesList.json";
import type { WordCategories } from "./types";
import ForcaDrawing from "./components/ForcaDrawing";
import ForcaWord from "./components/ForcaWord";
import ForcaKeyboard from "./components/ForcaKeyboard";
import "./App.css";

// Type assertion for the imported JSON
const categories = wordCategoriesList as WordCategories;

function getWord() {
	const allWords = Object.values(categories).flat();
	const randomIndex = Math.floor(Math.random() * allWords.length);
	return allWords[randomIndex].toUpperCase();
}

function App() {
	const [wordToGuess, setWordToGuess] = useState(() => {
		// Select a random word at the start of the game
		return getWord();
	});

	const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // Letters guessed by the player
	const incorrectLetters = guessedLetters.filter(
		(letter) => !wordToGuess.includes(letter)
	);

	const isLoser = incorrectLetters.length >= 6; // Maximum of 6 incorrect guesses
	const isWinner = wordToGuess
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

	const wordCategory = (randomWord: string): string => {
		const category = Object.keys(categories).find((category) =>
			categories[category as keyof WordCategories].includes(randomWord.toLowerCase())
		);
		return category ? category.toUpperCase() : "UNKNOWN";
	};

	const currentWordCategory = wordCategory(wordToGuess);

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
			setGuessedLetters([]);
			setWordToGuess(getWord());
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
								<strong> {currentWordCategory}</strong>
							</p>
						</div>
					)}
				</div>
				<div style={{ fontSize: "2rem", textAlign: "center" }}>
					{isWinner && "Parabéns! Você ganhou!"}
					{isLoser && `Que pena! A palavra era: ${wordToGuess}`}
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
							setGuessedLetters([]);
							setWordToGuess(getWord());
						}}
					>
						Play New Game or Press Enter
					</button>
				</div>
				<ForcaDrawing numberOfGuesses={incorrectLetters.length} />
				<ForcaWord
					reveal={isLoser}
					wordToGuess={wordToGuess}
					guessedLetters={guessedLetters}
				/>
				<div style={{ alignSelf: "stretch" }}>
					<ForcaKeyboard
						disabled={isWinner || isLoser}
						activeLetters={guessedLetters.filter((letter) =>
							wordToGuess.includes(letter)
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
