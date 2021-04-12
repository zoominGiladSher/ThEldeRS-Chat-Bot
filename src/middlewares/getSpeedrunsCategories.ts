import axios from 'axios';
import { load } from 'cheerio';

import { SPEEDRUN_BASE_URL } from '../constants';
import {
  IAdditionalCategories,
  IGetSpeedrunsRequest,
  IGetSpeedrunsResponse,
  ILeaders
} from '../types';

export const getSpeedrunsCategories = async (req: IGetSpeedrunsRequest, res: IGetSpeedrunsResponse) => {
  if (!req.query.game?.length) {
    res.status(400).json({
      message: 'No game provided to proxy'
    });
  }
  const { game, category } = req.query;
  const baseUrl = `${SPEEDRUN_BASE_URL}`;
  let leaderboardTableUrl = null;
  let additionalCategoriesUrl = `${baseUrl}/${game}`;;
  if (category) {
    leaderboardTableUrl = `${baseUrl}/ajax_leaderboard.php?game=${game}&verified=1&category=${category}`;
  }

  try {
    let additionalCategories = await getAvailableCategories(additionalCategoriesUrl);
    let leaders: ILeaders[] = [];
    if (leaderboardTableUrl) {
      leaders = await getLeaderboardTable(leaderboardTableUrl).then(
        result => result.filter((_, idx) => idx < 10)); // Get only top 10
    }
    res.status(200).json({
      leaders,
      additionalCategories
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Could not get results from speedrun.com'
    });
  }
}

async function getAvailableCategories(url: string): Promise<IAdditionalCategories[]> {
  const { data } = await axios.get(url);
  const $ = load(data);
  const additionalCategoriesElements = $('#leaderboardform > ul > a');
  const additionalCategories = additionalCategoriesElements.map((_,el) => ({
    name: $(el).text(),
    hash: $(el).attr('id')?.replace(/\D/g, '')
  })).get() as any;
  return additionalCategories;
}

async function getLeaderboardTable(url: string): Promise<ILeaders[]> {
  const { data } = await axios.get(url);
  const $ = load(data);
  const leaderboardTableRows = $('#primary-leaderboard tr.linked');
  const leaders = leaderboardTableRows.map((_, row) => {
    const runnerName = $(row).find('td:eq(1) .username-dark').text();
    const loadlessTime = $(row).find('td:eq(2)').text();
    return {
      runnerName,
      loadlessTime
    };
  }).get() as any;
  return leaders;
}