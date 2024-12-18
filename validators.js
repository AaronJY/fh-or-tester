const hasValidId = (s) =>
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/i.test(s.id.trim());

const hasValidName = (s) => typeof s.name === "string" && s.name.length > 0;

const hasValidDescription = (s) => typeof s.description === "string" && s.description.length > 0;

const hasValidUrl = (s) => {
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

module.exports = {
    hasValidId,
    hasValidName,
    hasValidDescription,
    hasValidUrl,
    hasValidOrganisation,
    hasValidContact,
    hasValidStatus
};