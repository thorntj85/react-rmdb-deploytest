// Alway name custom hook files with use..., then react knows this is a custom hook.

import { useState, useEffect } from "react";
import { POPULAR_BASE_URL } from "../../config";
// import { setState } from "expect/build/jestMatchersObject";

export const useHomeFetch = (searchTerm) => {
	const [state, setstate] = useState({ movies: [] });
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState(false);

	// console.log(state);

	const fetchMovies = async (endpoint) => {
		seterror(false);
		setloading(true);

		const isLoadMore = endpoint.search("page");

		try {
			const result = await (await fetch(endpoint)).json();

			setstate((prev) => ({
				...prev,
				movies:
					isLoadMore !== -1
						? [...prev.movies, ...result.results]
						: [...result.results],
				heroImage: prev.heroImage || result.results[0],
				currentPage: result.page,
				totalPages: result.total_pages
			}));
		} catch (error) {
			seterror(true);
			console.log(error);
		} finally {
			setloading(false);
		}
	};

	useEffect(() => {
		fetchMovies(POPULAR_BASE_URL);
	}, []);
	// Empty array above: means that the useEfect will render only once on mount.

	return [{ state, loading, error }, fetchMovies];
};
