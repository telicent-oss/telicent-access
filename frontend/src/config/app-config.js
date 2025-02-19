const { ACCESS_API_URL, SIGN_OUT_URL, BETA } = window;

const config = {
  beta: BETA || false,
  url: ACCESS_API_URL || "http://localhost:8091",
  SIGN_OUT_URL,
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
    { value: "group_id", label: "ID" },
    { value: "description", label: "Description" },
    { value: "userCount", label: "User count" },
    { value: "active", label: "Active" },
  ],
  userProperties: [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "nationality", label: "Nationality" },
    { value: "deployed_organisation", label: "Deployed organisation" },
    { value: "personnel_type", label: "Personnel type" },
    { value: "clearance", label: "Classification" },
    { value: "active", label: "Active" },
  ],
};

export default config;
