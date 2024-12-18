const { wait } = require("./helpers");
const insomnium = require("./insomnium.json");
const fs = require("fs");

const WAIT_BETWEEN_REQS_MS = 500;
const PER_PAGE=500;

const groups = insomnium.resources
    .filter(res => res._type === "request_group");

const las = insomnium.resources
    .filter(res => 
        res._type === "request" && 
        res.name === "/services")
    .map(res => ({
        group: groups.find(group => group._id == res.parentId),
        res
    }));

(async() => {
    console.log('Fetching LAs...');

    for (let la of las) {
        const laName = la.group.name;

        console.log(`Fetching services for ${laName}...`);
        const services = await fetchServices(la.res.url);
        console.log(`Found ${services.length} services for ${laName}!`);

        await writeServices(laName, services);
    }
})();

async function fetchServices(ep) {
    let page = 1;
    let services = [];

    do {
        const pagedEp = `${ep}?page=${page}&per_page=${PER_PAGE}`;
        const resp = await fetch(pagedEp);
        console.log(pagedEp);

        if (!resp.ok) {
            console.warn(`Could not fetch services for ${ep}. Skipping. (Resp code ${resp.status})`);
            return [];
        }
    
        const json =  await resp.json();

        services = [...services, ...json.content];

        if (json.last == true) {
            console.log("All services found!")
            break;
        }

        console.log(`Loaded ${services.length} of total ${json.totalElements}...`);

        page++;
        await wait(WAIT_BETWEEN_REQS_MS);
    } while (true);

    return services;
}

async function writeServices(name, services) {
    await fs.promises.writeFile(`data/${name}.json`, JSON.stringify(services, null, 2));
}
