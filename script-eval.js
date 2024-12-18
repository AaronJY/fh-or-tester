const fs = require('fs');

(async () => {
    const path = process.argv[0];
    if (!path) {
        throw new Error("Path not provided.");
    }

    // Load JSON from the path provided in the first CLI arg
    const services = await loadData(process.argv[2]);
    // Run the validators against every service in the list
    const results = services.map(service => {
        return {
            id: service.id,
            ...Object.keys(validators).reduce((acc, name) => {
                acc[name] = validators[name].fn(service);
                return acc;
            }, {})
        };
    });

    console.table(results);

    for (let validatorName in Object.keys(validators)) {
        const validator = validators[validatorName];
        const total = results.filter(x => x[validator])
    }
    

    // const totalWithValidID = results.filter(x => x.hasValidID).length;
    // console.log(`# of services with a valid ID: ${totalWithValidID}/${results.length} (${Math.round((totalWithValidID/results.length)*100)}%)`);

    // const totalWithValidStatus = results.filter(x => x.hasValidStatus).length;
    // console.log(`# of services with a valid status: ${totalWithValidStatus}/${results.length} (${Math.round((totalWithValidStatus/results.length)*100)}%)`); 

    // const totalWithValidName = results.filter(x => x.hasValidName).length;
    // console.log(`# of services with a valid name: ${totalWithValidName}/${results.length} (${Math.round((totalWithValidName/results.length)*100)}%)`);

    // const totalWithValidDescription = results.filter(x => x.hasValidDescription).length;
    // console.log(`# of services with a valid description: ${totalWithValidDescription}/${results.length} (${Math.round((totalWithValidDescription/results.length)*100)}%)`);

    // const totalWithValidURL = results.filter(x => x.hasValidURL).length;
    // console.log(`# of services with a valid URL: ${totalWithValidURL}/${results.length} (${Math.round((totalWithValidURL/results.length)*100)}%)`);

    // const totalWithValidOrganisation = results.filter(x => x.hasValidOrganisation).length;
    // console.log(`# of services with a valid organisation: ${totalWithValidOrganisation}/${results.length} (${Math.round((totalWithValidOrganisation/results.length)*100)}%)`);

    // const totalWithValidContact = results.filter(x => x.hasValidContact).length;
    // console.log(`# of services with a valid contact: ${totalWithValidContact}/${results.length} (${Math.round((totalWithValidContact/results.length)*100)}%)`);

    // console.log("--------------------");

    // const totalUsableServices = results.filter(x => 
    //     x.hasValidID &&
    //     x.hasValidStatus &&
    //     x.hasValidName &&
    //     x.hasValidDescription &&
    //     x.hasValidURL &&
    //     x.hasValidOrganisation &&
    //     x.hasValidContact).length;

    // console.log(`# of valid usable services: ${totalUsableServices}/${results.length} (${Math.round((totalUsableServices/results.length)*100)}%)`);

})();

async function loadData(path) {
    const text = await fs.promises.readFile(path, {
        encoding: "utf-8"
    });

    return JSON.parse(text);
}

const validators = {
    id: {
        fn: (s) => {
            return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i.test(s.id.trim());
        },
        desc: "# of services with a valid ID"
    },
    status: {
        fn: (s) => s.status === "active",
        desc: "# of services with a valid status"
    },
    name: {
        fn:  (s) => typeof s.name === "string" && s.name.length > 0,
        desc: "# of services with a valid name"
    },
    description: {
        fn: (s) => typeof s.description === "string" && s.description.length > 0,
        desc: "# of services with a valid description"
    },
    url: {
        fn: (s) => {
            try {
                new URL(s.url);
                return true;
            } catch (_) {
                return false;
            }
        },
        desc: "# of services with a valid URL"
    },
    org: {
        fn: (s) => !!s.organization?.id && !!s.organization?.name,
        desc: "# of services with a valid organisation"
    },
    contact: {
        fn: (s) => !!s.email?.length > 0,
        desc: "# of services with a valid contact"
    }
};
