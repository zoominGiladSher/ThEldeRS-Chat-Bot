import axios from 'axios';

import { SPEEDRUN_BASE_URL, SPACE } from '../constants';
import { ISearchRequest, ISearchResponse, SearchResponse } from '../types';

export const searchSpeedrun = async (req: ISearchRequest, res: ISearchResponse) => {
  if (!req.query.term?.length) {
    res.status(400).json({
      message: 'No search term provided to proxy'
    });
  }
  const { term } = req.query;
  const pathname = 'ajax_search.php';
  const url = `${SPEEDRUN_BASE_URL}/${pathname}?term=${term.split(SPACE).join('+')}`;
  try {
    const { data: searchResults } = await axios.get<SearchResponse[]>(url);
    res.status(200).json(searchResults);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not get results from speedrun.com'
    });
  }
}