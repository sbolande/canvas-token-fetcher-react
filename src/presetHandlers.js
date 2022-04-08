import Store from "electron-store";
const store = new Store({ name: "presets" });

export function getPresets(_) {
  console.log("Fetching presets from store");
  var presets = {};
  if (store.has("username")) presets.username = store.get("username");
  // if (store.has("password")) presets.password = store.get("password");
  if (store.has("subdomain")) presets.subdomain = store.get("subdomain");
  if (store.has("purpose")) presets.purpose = store.get("purpose");
  return presets;
}

export function setPresets(
  _,
  { username, /* password, */ subdomain, purpose }
) {
  console.log("Saving presets to store");
  store.set({
    username: username,
    // password: password,
    subdomain: subdomain,
    purpose: purpose,
  });
}
