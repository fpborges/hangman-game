import { useState, useEffect, useCallback } from "react";
import categories from "./wordCategoriesList.json";
import ForcaDrawing from "./components/ForcaDrawing";
import ForcaWord from "./components/ForcaWord";
import ForcaKeyboard from "./components/ForcaKeyboard";
import "./App.css";

function getRandomWord(category?: string) {
    // If no category is provided, get a random category
    if (!category) {
        const allCategories = Object.keys(categories);
        const randomCategoryIndex = Math.floor(Math.random() * allCategories.length);
        category = allCategories[randomCategoryIndex];
    }
    
    // Get words from the selected category
    const words = categories[category as keyof typeof categories];
    const randomIndex = Math.floor(Math.random() * words.length);
    
    return {
        word: words[randomIndex].toUpperCase(),
        category: category
    };
}

function App() {
	// Estado para a palavra a ser adivinhada e sua categoria
	const [gameState, setGameState] = useState(() => {
		// Seleciona uma palavra aleatória e sua categoria
		return getRandomWord();
	});
	
	const wordToGuess = gameState.word;

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
			setGameState(getRandomWord());
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
					<div>Categoria: {gameState.category}</div>
					{isWinner && "Parabéns! Você ganhou!"}
					{isLoser && `Que pena! A palavra era: ${wordToGuess}`}
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
