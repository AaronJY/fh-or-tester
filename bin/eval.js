const fs = require('fs');
const { hasValidId, hasValidStatus, hasValidName, hasValidDescription, hasValidOrganisation, hasValidContact, hasValidUrl } = require('../validators');
const { program } = require("commander");

program
    .argument("<path>", "Path to the JSON data file.")
    .option("-s, --show-services", "Shows detailed validation information for each service in a table.", false);

program.parse();

const options = program.opts();

(async () => {
    const path = process.argv[2];
    if (!path) {
        console.error("Path not provided.");
        process.exit(1);
    }

    // Load services array from the given JSON file
    const services = await loadData(path);
    // Iterate over and validate all services
    const results = services.map(service => ({
        id: service.id,
        hasValidID: hasValidId(service),
        hasValidStatus: hasValidStatus(service),
        hasValidName: hasValidName(service),
        hasValidDescription: hasValidDescription(service),
        hasValidURL: hasValidUrl(service),
        hasValidOrganisation: hasValidOrganisation(service),
        hasValidContact: hasValidContact(service)
    }));

    if (options.showServices) {
        console.table(results);
    }

    const validationResultMessage = (text, validTotal) =>
        `${text}: ${validTotal}/${results.length} (${Math.round((validTotal / results.length) * 100)}%)`;

    console.log("--------------------");
    console.log("RESULTS");
    console.log("--------------------");

    console.log(validationResultMessage(
        "# of services with a valid ID",
        results.filter(x => x.hasValidID).length
    ));

    console.log(validationResultMessage(
        "# of services with a valid status",
        results.filter(x => x.hasValidStatus).length,
    ));

    console.log(validationResultMessage(
        "# of services with a valid name",
        results.filter(x => x.hasValidName).length
    ));

    console.log(validationResultMessage(
        "# of services with a valid description",
        results.filter(x => x.hasValidDescription).length
    ));

    console.log(validationResultMessage(
        "# of services with a valid URL",
        results.filter(x => x.hasValidURL).length
    ));

    console.log(validationResultMessage(
        "# of services with a valid organisation",
        results.filter(x => x.hasValidOrganisation).length
    ));

    console.log(validationResultMessage(
        "# of services with a valid contact",
        results.filter(x => x.hasValidContact).length
    ));

    console.log("--------------------");

    console.log(validationResultMessage(
        "# of usable services",
        results.filter(x =>
            x.hasValidID &&
            x.hasValidStatus &&
            x.hasValidName &&
            x.hasValidDescription &&
            x.hasValidURL &&
            x.hasValidOrganisation &&
            x.hasValidContact).length));
    
    console.log("--------------------");

})();

async function loadData(path) {
    console.log(`Loading JSON data from ${path}...`);

    try {
        const text = await fs.promises.readFile(path, {
            encoding: "utf-8"
        });
    
        return JSON.parse(text);
    } catch (error) {
        throw new Error("Unable to load JSON data file", { cause: error });
    }
}