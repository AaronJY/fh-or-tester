const fs = require('fs');

(async () => {
    const path = process.argv[0];
    if (!path) {
        throw new Error("Path not provided.");
    }

    const results = [];
    const services = await loadData(process.argv[2]);
    for (let service of services) {
        results.push({
            id: service.id,
            hasValidID: hasValidID(service),
            hasValidStatus: hasValidStatus(service),
            hasValidName: hasValidName(service),
            hasValidDescription: hasValidDescription(service),
            hasValidURL: hasValidURL(service),
            hasValidOrganisation: hasValidOrganisation(service),
            hasValidContact: hasValidContact(service)
        });
    }

    // console.table(results);

    const totalWithValidID = results.filter(x => x.hasValidID).length;
    console.log(`# of services with a valid ID: ${totalWithValidID}/${results.length} (${Math.round((totalWithValidID/results.length)*100)}%)`);

    const totalWithValidStatus = results.filter(x => x.hasValidStatus).length;
    console.log(`# of services with a valid status: ${totalWithValidStatus}/${results.length} (${Math.round((totalWithValidStatus/results.length)*100)}%)`); 

    const totalWithValidName = results.filter(x => x.hasValidName).length;
    console.log(`# of services with a valid name: ${totalWithValidName}/${results.length} (${Math.round((totalWithValidName/results.length)*100)}%)`);

    const totalWithValidDescription = results.filter(x => x.hasValidDescription).length;
    console.log(`# of services with a valid description: ${totalWithValidDescription}/${results.length} (${Math.round((totalWithValidDescription/results.length)*100)}%)`);

    const totalWithValidURL = results.filter(x => x.hasValidURL).length;
    console.log(`# of services with a valid URL: ${totalWithValidURL}/${results.length} (${Math.round((totalWithValidURL/results.length)*100)}%)`);

    const totalWithValidOrganisation = results.filter(x => x.hasValidOrganisation).length;
    console.log(`# of services with a valid organisation: ${totalWithValidOrganisation}/${results.length} (${Math.round((totalWithValidOrganisation/results.length)*100)}%)`);

    const totalWithValidContact = results.filter(x => x.hasValidContact).length;
    console.log(`# of services with a valid contact: ${totalWithValidContact}/${results.length} (${Math.round((totalWithValidContact/results.length)*100)}%)`);

    console.log("--------------------");

    const totalUsableServices = results.filter(x => 
        x.hasValidID &&
        x.hasValidStatus &&
        x.hasValidName &&
        x.hasValidDescription &&
        x.hasValidURL &&
        x.hasValidOrganisation &&
        x.hasValidContact).length;

    console.log(`# of valid usable services: ${totalUsableServices}/${results.length} (${Math.round((totalUsableServices/results.length)*100)}%)`);

})();

async function loadData(path) {
    const text = await fs.promises.readFile(path, {
        encoding: "utf-8"
    });

    return JSON.parse(text);
}

// Validators

const hasValidID = (s) => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i.test(s.id.trim());
}

const hasValidName = (s) => typeof s.name === "string" && s.name.length > 0;

const hasValidDescription = (s) => typeof s.description === "string" && s.description.length > 0;

const hasValidURL = (s) => {
    try {
        new URL(s.url);
        return true;
    } catch (_) {
        return false;
    }
};

const hasValidOrganisation = (s) => !!s.organization?.id && !!s.organization?.name;

const hasValidContact = (s) => !!s.email?.length > 0;

const hasValidStatus = (s) => s.status === "active";