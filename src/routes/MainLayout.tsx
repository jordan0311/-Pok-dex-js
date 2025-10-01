import { Outlet } from 'react-router';
import { useName } from '../hooks/useName';

function MainLayout() {
	const { name, clearName } = useName();

	return (
		<>
			{/* 🌌 Header estilo futurista Pokédex */}
			<header
				className="p-6 bg-gradient-to-r from-gray-900 via-black to-gray-900
                 shadow-lg border-b border-red-500 text-center"
			>
				<h1
					className="text-3xl md:text-4xl font-extrabold tracking-wide 
                       text-transparent bg-clip-text bg-gradient-to-r 
                       from-red-400 via-yellow-400 to-cyan-400 drop-shadow-lg"
				>
					Hola <span className="text-red-500">{name}</span>, bienvenido a tu{' '}
					<span className="text-cyan-400">Pokédex</span> 🔥
				</h1>
			</header>

			{/* 🌑 Main con ambiente oscuro */}
			<main className="p-6 bg-gradient-to-b from-gray-950 via-black to-gray-950 min-h-screen font-sans flex flex-col">
				{/* Contenido dinámico */}
				<div className="flex-grow">
					<Outlet />
				</div>

				{/* 🚪 Botón Salir al final */}
				<div className="mt-6 flex justify-end">
					<div className="mt-6 flex justify-end">
						<button
							className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 
			text-white font-bold rounded-xl 
			hover:from-orange-500 hover:to-red-600 
			transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
							onClick={clearName}
						>
							Salir
						</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default MainLayout;
