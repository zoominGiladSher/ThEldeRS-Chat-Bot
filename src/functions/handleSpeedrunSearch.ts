import axios from 'axios';
import { hasArgs } from '../utils';
import { SearchResponse } from '../types';
import { PROXY_SEARCH_ROUTE, PROXY_URL } from '../constants';

export async function handleSpeedrunSearch(args?: string[]) {
  if (!hasArgs(args)) {
    return;
  }

  const searchTerm = args?.join('+');
  const pathname = PROXY_SEARCH_ROUTE;
  const port = process.env.PORT!;
  const url = `${PROXY_URL}:${port}/${pathname}?term=${searchTerm}`;

  try {
    const response = await axios.get<SearchResponse[]>(url);
    const searchResults = response.data;
    if (!searchResults.length) {
      return 'No results found for this search term!';
    }
    const mappedResults = searchResults.map(result => `${result.url}`).join(', ');
    return `Possible games: ${mappedResults}.`;
  } catch (error) {
    return 'Error occurred while fetching results from speedrun.com: ' + error;
  }
}