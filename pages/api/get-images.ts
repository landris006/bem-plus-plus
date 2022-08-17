import type { NextApiRequest, NextApiResponse } from 'next';

export interface Image {
  source: string;
  title: string;
  url: string;
}

interface Data {
  results?: Image[];
  error?: unknown;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const Scraper = require('images-scraper');
    const google = new Scraper({
      puppeteer: {
        headless: true,
      },
    });

    const results = await google.scrape(req.query.q, 100);

    res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
