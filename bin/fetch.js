const { wait, toFriendlyFilename } = require("../helpers");
const fs = require("fs");
const { program } = require("commander");

program
  .argument("<url>", "Services URL of the OR UK API to fetch data from.")
  .option("-o, --out-path", "Output path to save fetched JSON data to.", "./data/<url>.json")
  .option("-w, --wait-between-req-ms", "The number of milliseconds to wait between API requests.", 500)
  .option("-p, --per-page", "The number of items to return in each response.", 500);

program.parse();

const options = program.opts();

(async () => {
  const url = program.args[0];
  const host = new URL(url).host;
  const outPath = (options.outPath.replace("<url>", toFriendlyFilename(host)));

  // Get services
  console.log(`Fetching services from ${url}...`);
  const services = await fetchServices(url, options.perPage, options.waitBetweenReqMs);

  // Write to file
  await fs.promises.writeFile(
    outPath,
    JSON.stringify(services, null, 2)
  );
  console.log(`Wrote services ${services.length} to ${outPath}.`)
})();

async function fetchServices(ep, perPage, waitMs) {
  let page = 1;
  let services = [];

  do {
    const pagedEp = `${ep}?page=${page}&per_page=${perPage}`;
    const resp = await fetch(pagedEp);

    if (!resp.ok) {
      console.warn(
        `Could not fetch services for ${ep}. Skipping. (Resp code ${resp.status})`
      );
      return [];
    }

    const json = await resp.json();

    services = [...services, ...json.content];

    if (json.last == true) {
      console.log("All services found!");
      break;
    }

    console.log(`Loaded ${services.length} of total ${json.totalElements}...`);

    page++;
    await wait(waitMs);
  } while (true);

  return services;
}
