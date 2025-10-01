import Item from './Item';
import { Link } from 'react-router';

type pokemon = {
	name: string;
	url: string;
};

export default function List({
	pokemons,
}: {
	pokemons: pokemon[] | undefined;
}) {
	return (
		<div className="px-6 py-10">
			{/* Grid de Pokémon */}
			<div
				className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 
               bg-gradient-to-b from-black via-gray-900 to-black 
               p-6 rounded-xl shadow-inner shadow-black/50"
			>
				{pokemons &&
					pokemons.map((pokemon) => (
						<Link
							key={pokemon.name}
							to={`/dex/${pokemon.name}`}
							className="group block transform transition-transform duration-300 hover:scale-105"
						>
							<Item url={pokemon.url} />
						</Link>
					))}
			</div>

			{/* Si no hay pokémon */}
			{pokemons?.length === 0 && (
				<p className="text-center text-lg text-red-400 font-semibold mt-6 animate-pulse">
					⚠ No hay Pokémon disponibles
				</p>
			)}
		</div>
	);
}
