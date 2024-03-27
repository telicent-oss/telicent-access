const { ACCESS_API_URL, AUTH_TYPE, BETA } = window._env_;

const config = {
  beta: BETA,
  authType: AUTH_TYPE,
  url: ACCESS_API_URL,
  classifications: [
    { value: "O", label: "Official" },
    { value: "OS", label: "Official Sensitive" },
    { value: "S", label: "Secret" },
    { value: "TS", label: "Top Secret" },
  ],
  personnelTypes: [
    { value: "GOV", label: "Government" },
    { value: "NON-GOV", label: "Non-government" },
  ],
  groupProperties: [
    { value: "label", label: "Name" },
    { value: "groupId", label: "ID" },
    { value: "description", label: "Description" },
    { value: "userCount", label: "User count" },
    { value: "active", label: "Active" },
  ],
  userProperties: [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "nationality", label: "Nationality" },
    { value: "deployedOrganisation", label: "Deployed organisation" },
    { value: "personnelType", label: "Personnel type" },
    { value: "clearance", label: "Classification" },
    { value: "active", label: "Active" },
  ],
};

export default config;
