const fetch = require('node-fetch');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const rootDir = require('app-root-dir').get();
const path = require('path');
const fs = require('fs');
let getPaintext = (async () => {
  const response = await fetch(
    'https://ipfs.io/ipfs/bafybeih3yul3qssgibmudfdfgevbi5bkqpg7qign7vlw57fn3h34vpcti4'
  );
  const body = await response.text();
  const dom = new JSDOM(body);
  let jsonUrls = Array.from(dom.window.document.querySelectorAll('.ipfs-hash'));
  jsonUrls.reverse().pop();

  let temp = fetchJsonUrls(jsonUrls);
  let a = await Promise.all(temp);
  console.log(
    a,
    '------------------------------------------------------------------------------------------'
  );
  // for (let index = 1; index < 3; index++) {
  //   const element = jsonFiles[index];
  //   let getJson = await fetch(`https://ipfs.io/${element}`);
  //   let jsonContent = await getJson.json();
  // fs.writeFileSync(
  //   path.join(rootDir, 'files', `${index}.json`),
  //   JSON.stringify(jsonContent),
  //   {
  //     encoding: 'utf-8',
  //   }
  // );
  // fs.writeFile(
  //   path.join(rootDir, 'files', `${index}.json`),
  //   JSON.stringify(jsonContent),
  //   { encoding: 'utf-8' },
  //   (err) => {
  //     if (err) console.log(err);
  //   }
  // );
  // }
})();

const fetchJsonUrls = (jsonUrls) => {
  try {
    let jsonFetchResponses = [];
    jsonUrls.forEach((url) => {
      jsonFetchResponses.push(
        axios.get(`https://ipfs.io/${url}`, {
          headers: {
            Accept: 'application/json',
            'Accept-Encoding': 'identity',
          },
          params: { trophies: true },
        })
      );
    });
    return jsonFetchResponses;
  } catch (error) {
    console.log(error);
    return null;
  }
};
