import { useState, useEffect, useCallback } from "react";
// import words from "./wordList.json";
import wordCategoriesList from "./wordCategoriesList.json";
import ForcaDrawing from "./components/ForcaDrawing";
import ForcaWord from "./components/ForcaWord";
import ForcaKeyboard from "./components/ForcaKeyboard";
import "./App.css";

function getWord() {
	const allWords = Object.values(wordCategoriesList).flat();
	const randomIndex = Math.floor(Math.random() * allWords.length);
	return allWords[randomIndex].toUpperCase();
}

function App() {
	const [wordToGuess, setWordToGuess] = useState(() => {
		// Seleciona uma palavra aleatória da lista
		return getWord();
	});

	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const incorrectLetters = guessedLetters.filter(
		(letter) => !wordToGuess.includes(letter)
	);

	const isLoser = incorrectLetters.length >= 6;
	const isWinner = wordToGuess
		.split("")
		.every((letter) => guessedLetters.includes(letter));

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

	// Adiciona um listener para capturar as teclas pressionadas

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
	}, [guessedLetters]);

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
					margin: "0 auto",
					gap: "2rem",
					textAlign: "center",
					alignItems: "center",
				}}
			>
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
