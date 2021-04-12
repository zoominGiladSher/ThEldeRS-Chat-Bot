import axios from 'axios';
import { hasArgs } from '../utils';
import { PROXY_LEADERBOARD_ROUTE, PROXY_URL } from '../constants';
import { ILeaderboardResponse } from '../types';

export async function handleLeaderboard(args?: string[]) {
	if (!hasArgs(args)) {
		return;
	}

	const game = args![0]!;
	const category = args![1];
	const pathname = PROXY_LEADERBOARD_ROUTE;
	const port = process.env.PORT!;
	const url = `${PROXY_URL}:${port}/${pathname}?game=${game}${
		category?.length ? `&category=${category}` : ''
	}`;

	try {
		const {
			data: { additionalCategories, leaders },
		} = await axios.get<ILeaderboardResponse>(url);
		if (leaders?.length) {
			const message =
				leaders
					.map((leader) => `${leader.runnerName}: ${leader.loadlessTime}`)
					.join(', ') + '.';
			return message;
		}
		if (additionalCategories.length) {
			const message =
				'In order to get the leaders please repeat the command with one of the following hashes: ' +
				additionalCategories
					.map(
						(category) => `for ${category.name} - use ${category.hash}`
					)
					.join(', ');
			return message;
		}

		return 'Did not find any results for that game/category.';
	} catch (error) {
		return (
			'Error occurred while fetching results from speedrun.com: ' +
			error.message
		);
	}
}
