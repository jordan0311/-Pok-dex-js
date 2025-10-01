import { useEffect, useState } from 'react';
import List from '../components/List';
import axios from 'axios';

type Pokemon = {
	name: string;
	url: string;
};

type Type = {
	name: string;
	url: string;
};

const BaseUrl = 'https://pokeapi.co/api/v2';

export default function Dex() {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [types, setTypes] = useState<Type[]>([]);
	const [pokemonsByType, setPokemonsByType] = useState<Pokemon[] | null>(null);

	const [searchValue, setSearchValue] = useState('');
	const [selectValue, setSelectValue] = useState('');

	// 🔥 Paginación
	const [page, setPage] = useState(0);
	const itemsPerPage = 20;

	// Obtener TODOS los pokémon (1118 aprox)
	useEffect(() => {
		axios
			.get(`${BaseUrl}/pokemon?limit=2000&offset=0`)
			.then((res) => setPokemons(res.data.results))
			.catch((err) => console.error(err));
	}, []);

	// Obtener tipos
	useEffect(() => {
		axios
			.get(BaseUrl + '/type?limit=21')
			.then((res) => setTypes(res.data.results))
			.catch((err) => console.error(err));
	}, []);

	// Filtrar por tipo
	useEffect(() => {
		if (selectValue !== '') {
			axios.get(BaseUrl + `/type/${selectValue}`).then((res) => {
				const pokemonNames = res.data.pokemon.map(
					(p: { pokemon: Pokemon }) => p.pokemon.name,
				);
				const filteredPokemons =
					pokemons?.filter((p) => pokemonNames.includes(p.name)) || [];
				setPokemonsByType(filteredPokemons);
				setPage(0); // Reiniciamos a la primera página al cambiar el filtro
			});
		} else {
			setPokemonsByType(null);
			setPage(0);
		}
	}, [selectValue, pokemons]);

	// 🔍 Filtrado por búsqueda
	const pokemonsFiltered = (selectValue ? pokemonsByType : pokemons)?.filter(
		(p) => p.name.toLowerCase().includes(searchValue.toLowerCase()),
	);

	// 🔥 Paginación aplicada al resultado filtrado
	const start = page * itemsPerPage;
	const end = start + itemsPerPage;
	const paginatedPokemons = pokemonsFiltered?.slice(start, end) || [];

	return (
		<div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-10">
			{/* Encabezado */}
			<h1
				className="text-center text-5xl font-extrabold mb-10 
        text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600
        drop-shadow-[0_0_15px_rgba(255,120,0,0.9)] animate-pulse"
			>
				⚡ Pokédex Nacional ⚡
			</h1>

			{/* Barra de búsqueda y filtros */}
			<form className="mb-10 flex flex-col md:flex-row gap-6 justify-center items-center">
				<input
					type="text"
					className="bg-gray-800/70 border-2 border-orange-500 focus:border-yellow-400 
            text-white text-center rounded-xl py-2 px-6 w-full md:w-1/3 
            placeholder-gray-400 transition-all duration-300 focus:scale-105 shadow-lg"
					placeholder="🔍 Buscar Pokémon..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>

				<select
					value={selectValue}
					onChange={(e) => setSelectValue(e.target.value)}
					className="bg-gray-800/70 border-2 border-orange-500 focus:border-yellow-400 
            text-white rounded-xl py-2 px-6 w-full md:w-1/4 capitalize 
            cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
				>
					<option value="">🌐 Selecciona un tipo</option>
					{types &&
						types.map((t) => (
							<option key={t.name} value={t.name} className="capitalize">
								{t.name}
							</option>
						))}
				</select>
			</form>

			{/* Lista de Pokémon */}
			<div className="mt-8">
				<List pokemons={paginatedPokemons} />
			</div>

			{/* 🔥 Paginación */}
			{pokemonsFiltered && pokemonsFiltered.length > itemsPerPage && (
				<div className="flex justify-center gap-6 mt-12">
					<button
						disabled={page === 0}
						onClick={() => setPage((prev) => prev - 1)}
						className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-5 py-2 rounded-lg 
            shadow-md shadow-black/40 disabled:opacity-40 disabled:cursor-not-allowed 
            transition-all duration-300"
					>
						◀ Anterior
					</button>

					<span className="px-4 py-2 bg-black/60 border border-orange-400 rounded-lg shadow-md text-yellow-400 font-semibold">
						Página {page + 1} de{' '}
						{Math.ceil(pokemonsFiltered.length / itemsPerPage)}
					</span>

					<button
						disabled={end >= pokemonsFiltered.length}
						onClick={() => setPage((prev) => prev + 1)}
						className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-5 py-2 rounded-lg 
            shadow-md shadow-black/40 transition-all duration-300"
					>
						Siguiente ▶
					</button>
				</div>
			)}
		</div>
	);
}
