import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';

const BaseUrl = 'https://pokeapi.co/api/v2/pokemon';

type Pokemon = {
	id: number;
	name: string;
	image: string;
	types: string[];
	moves: string[];
	stats: Stats;
};

type Type = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};

type Moves = {
	move: Move;
	version_group_details: VersionGroupDetail[];
};

interface Move {
	name: string;
	url: string;
}

interface VersionGroupDetail {
	level_learned_at: number;
	move_learn_method: MoveLearnMethod;
	order: any;
	version_group: VersionGroup;
}

interface MoveLearnMethod {
	name: string;
	url: string;
}

interface VersionGroup {
	name: string;
	url: string;
}

type Stats = {
	hp: number;
	attack: number;
	defense: number;
	specialAttack: number;
	specialDefense: number;
	speed: number;
};

export default function Details() {
	const params = useParams();
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);

	useEffect(() => {
		axios
			.get(`${BaseUrl}/${params.name}`)
			.then((res) => {
				setPokemon({
					id: res.data.id,
					name: res.data.name,
					image: res.data.sprites.other['official-artwork'].front_default,
					types: res.data.types.map((type: Type) => type.type.name),
					moves: res.data.moves
						.map((move: Moves) => move.move.name)
						.slice(0, 10),
					stats: {
						hp: res.data.stats[0].base_stat,
						attack: res.data.stats[1].base_stat,
						defense: res.data.stats[2].base_stat,
						specialAttack: res.data.stats[3].base_stat,
						specialDefense: res.data.stats[4].base_stat,
						speed: res.data.stats[5].base_stat,
					},
				});
			})
			.catch((err) => console.error(err));
	}, [params.name]);

	// Loader bonito estilo Pokéball
	if (!pokemon)
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
				<div className="relative w-24 h-24">
					{/* círculo principal */}
					<div className="absolute inset-0 rounded-full border-8 border-t-red-500 border-b-white border-l-gray-300 border-r-gray-300 animate-spin"></div>
					{/* centro de la pokeball */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-8 h-8 bg-white border-4 border-gray-700 rounded-full"></div>
					</div>
				</div>
				<p className="mt-6 text-yellow-300 font-extrabold text-xl tracking-wider animate-pulse">
					Capturando Pokémon...
				</p>
			</div>
		);

	return (
		<div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-10">
			{/* Header */}
			<div className="flex justify-between items-center mb-10">
				<Link
					to="/dex"
					className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-5 py-2 rounded-lg 
            shadow-md shadow-black/40 transition-all duration-300"
				>
					◀ Volver
				</Link>

				<div className="text-right">
					<h1
						className="text-4xl font-extrabold capitalize text-transparent bg-clip-text 
            bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 drop-shadow-[0_0_10px_rgba(255,120,0,0.9)]"
					>
						{pokemon.name}
					</h1>
					<p className="text-gray-300 font-mono text-lg">
						N.º {pokemon.id.toString().padStart(4, '0')}
					</p>
				</div>
			</div>

			{/* Imagen principal */}
			<div className="flex justify-center mb-10">
				<img
					src={pokemon.image}
					alt={pokemon.name}
					className="w-72 h-72 object-contain drop-shadow-[0_0_20px_rgba(255,100,0,0.6)]"
				/>
			</div>

			{/* Info principal */}
			<div className="grid md:grid-cols-3 gap-8">
				{/* Stats */}
				<div className="bg-gray-800/60 p-6 rounded-xl shadow-lg border border-orange-500">
					<h2 className="text-2xl font-bold text-yellow-400 mb-4">⚡ Stats</h2>
					<ul className="space-y-2">
						{Object.entries(pokemon.stats).map(([key, value]) => (
							<li
								key={key}
								className="flex justify-between text-sm font-mono text-gray-200"
							>
								<span className="capitalize">{key}</span>
								<span className="font-bold text-orange-400">{value}</span>
							</li>
						))}
					</ul>
				</div>

				{/* Types */}
				<div className="bg-gray-800/60 p-6 rounded-xl shadow-lg border border-red-500">
					<h2 className="text-2xl font-bold text-yellow-400 mb-4">🔥 Tipos</h2>
					<ul className="flex gap-3 flex-wrap">
						{pokemon.types.map((type) => (
							<li
								key={type}
								className="px-4 py-2 rounded-full text-sm font-semibold capitalize 
                  bg-gradient-to-r from-orange-600 to-yellow-500 shadow-md shadow-black/40"
							>
								{type}
							</li>
						))}
					</ul>
				</div>

				{/* Moves */}
				<div className="bg-gray-800/60 p-6 rounded-xl shadow-lg border border-yellow-500">
					<h2 className="text-2xl font-bold text-yellow-400 mb-4">
						🌀 Movimientos
					</h2>
					<ul className="grid grid-cols-2 gap-3 text-sm">
						{pokemon.moves.map((move) => (
							<li
								key={move}
								className="bg-black/40 border border-orange-400 px-3 py-2 rounded-lg capitalize text-gray-200 hover:scale-105 transition-transform duration-300"
							>
								{move}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
