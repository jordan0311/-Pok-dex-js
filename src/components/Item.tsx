import { useEffect, useState } from 'react';
import axios from 'axios';

type Pokemon = {
	id: number;
	name: string;
	image: string;
	types: string[];
};

type Type = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};

export default function Item({ url }: { url: string }) {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				setPokemon({
					id: res.data.id,
					name: res.data.name,
					image: res.data.sprites.other['official-artwork'].front_default,
					types: res.data.types.map((type: Type) => type.type.name),
				});
			})
			.catch((err) => console.error(err));
	}, [url]);

	// Loader bonito estilo Pokéball
	if (!pokemon)
		return (
			<div className="flex flex-col items-center justify-center p-10">
				<div className="relative w-20 h-20">
					{/* círculo principal */}
					<div className="absolute inset-0 rounded-full border-4 border-t-red-500 border-b-white border-l-gray-300 border-r-gray-300 animate-spin"></div>
					{/* centro de la pokeball */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-6 h-6 bg-white border-4 border-gray-700 rounded-full"></div>
					</div>
				</div>
				<p className="mt-4 text-yellow-300 font-bold tracking-wide animate-pulse">
					Capturando Pokémon...
				</p>
			</div>
		);

	return (
		<div
			className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800
        border-2 border-orange-500/60 rounded-2xl 
        shadow-lg shadow-orange-900/40 p-6 
        hover:scale-105 hover:border-yellow-400 hover:shadow-yellow-500/40
        transition-all duration-500 flex flex-col items-center"
		>
			{/* Imagen */}
			<img
				src={pokemon.image}
				alt={pokemon.name}
				className="w-40 h-40 object-contain drop-shadow-[0_0_20px_rgba(255,140,0,0.6)] mb-4"
			/>

			{/* ID */}
			<p className="text-orange-400 text-sm font-semibold opacity-80">
				#{pokemon.id.toString().padStart(4, '0')}
			</p>

			{/* Nombre */}
			<h2 className="text-yellow-400 text-2xl font-extrabold capitalize tracking-wide drop-shadow-md">
				{pokemon.name}
			</h2>

			{/* Tipos */}
			<div className="flex gap-2 justify-center mt-3 flex-wrap">
				{pokemon.types.map((t) => (
					<span
						key={t}
						className="bg-orange-600/30 border border-orange-400/60 
              rounded-full py-1 px-4 text-sm text-yellow-300 capitalize shadow-inner"
					>
						{t}
					</span>
				))}
			</div>
		</div>
	);
}
