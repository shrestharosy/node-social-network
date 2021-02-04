const yargs = require('yargs');
const fetch = require('node-fetch');

const config = require('../../config');

yargs.command(
  'feed',
  'Get limited feed of a page ',
  (yargs) => {
    yargs
      .usage('Usage: $0 feed -p [number] -l [number]')
      .demandOption(['p', 'l'])
      .option('page', {
        alias: 'p',
        description: 'Page number of the feed that you want to view',
        type: 'number',
      })
      .option('limit', {
        alias: 'l',
        description: 'Page limit of the feed',
        type: 'number',
      });
  },
  main
).argv;

async function main({ page, limit }) {
  const response = await requestViewFeed(page, limit);
  if (response.error) throw new Error(response.error);
  else console.log(response);
}

async function requestViewFeed(page, limit) {
  const res = await fetch(
    `${config.apiHost}/posts?page=${page}&limit=${limit}`,
    {
      method: 'GET',
    }
  );
  return res.json();
}
