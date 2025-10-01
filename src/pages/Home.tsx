import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useName } from '../hooks/useName';

export default function Home() {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [error, setError] = useState('');
	const { setName } = useName();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		const value = inputRef.current?.value;

		if (!value || value.trim() === '') {
			setError('Por favor ingresa un nombre válido');
			return;
		}

		setName(value.trim());
		if (inputRef.current) inputRef.current.value = '';
		navigate('/dex');
	};

	return (
		<div className="min-h-dvh bg-black text-gray-200 grid place-items-center relative overflow-hidden">
			{/* Fondo con imágenes */}
			<div className="absolute inset-0 z-0 pointer-events-none opacity-40">
				{/* Charizard */}
				<img
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
					alt="Charizard"
					className="absolute top-20 left-1/2 -translate-x-1/2 w-72 md:w-[28rem] animate-pulse hover:scale-110 transition-transform duration-700"
				/>
				{/* Pikachu */}
				<img
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
					alt="Pikachu"
					className="absolute bottom-8 left-8 w-60 animate-pulse hover:scale-110 transition-transform duration-700"
				/>
				{/* Bulbasaur */}
				<img
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
					alt="Bulbasaur"
					className="absolute bottom-8 right-8 w-60 animate-pulse hover:scale-110 transition-transform duration-700"
				/>
			</div>

			{/* Título superior */}
			<div className="absolute top-0 w-full bg-black/70 backdrop-blur-sm py-4 shadow-md z-20">
				<h1
					className="
      text-center 
      text-3xl md:text-5xl 
      font-extrabold 
      tracking-wide 
      drop-shadow-lg
      bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 
      bg-clip-text text-transparent 
      transition-all duration-500 
      hover:scale-110 hover:from-yellow-400 hover:via-red-600 hover:to-orange-600
      animate-gradient-x
    "
				>
					¡Bienvenido a la Pokédex!
				</h1>
			</div>

			{/* Caja principal */}
			<div className="relative z-10 space-y-6 max-w-md w-full p-6 bg-black/70 rounded-2xl shadow-lg backdrop-blur mt-40">
				<h2 className="text-3xl font-bold text-center text-orange-500 drop-shadow-[0_0_10px_rgba(255,100,0,0.8)]">
					🔥 Pokédex de Charizard
				</h2>
				<p className="text-center text-yellow-400 drop-shadow-md">
					Para comenzar tu viaje Pokémon, dinos tu nombre
				</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						ref={inputRef}
						type="text"
						className="w-full bg-transparent border-0 border-b-2 border-orange-500 focus:outline-none focus:border-yellow-400 text-center py-2 text-lg placeholder-gray-400 text-white transition-all duration-300"
						placeholder="Ingresa tu nombre"
					/>
					<button
						type="submit"
						className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 
			hover:from-yellow-500 hover:via-orange-500 hover:to-red-600
			text-white font-bold rounded-xl px-4 py-2 w-full cursor-pointer 
			transition-all duration-500 shadow-lg shadow-orange-900 hover:scale-105"
					>
						🔥 Comenzar
					</button>

					{error && (
						<p className="text-center text-sm text-red-400 font-semibold drop-shadow-md">
							{error}
						</p>
					)}
				</form>
			</div>
		</div>
	);
}
