import { useState, useEffect, useCallback } from "react";
import { API_URL, API_KEY } from "../../config";

export const useMovieFetch = (movieId) => {
	const [state, setstate] = useState([]);
	const [loading, setloading] = useState(true);
	const [error, seterror] = useState(false);

	const fetchData = useCallback(async () => {
		seterror(false);
		setloading(true);

		try {
			const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
			const result = await (await fetch(endpoint)).json();
			const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
			const creditsResult = await (await fetch(creditsEndpoint)).json();
			const directors = creditsResult.crew.filter(
				(member) => member.job === "Director"
			);

			setstate({
				...result,
				actor: creditsResult.cast,
				directors
			});
		} catch (error) {
			seterror(true);
		} finally {
			setloading(false);
		}
	}, [movieId]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return [state, loading, error];
};
