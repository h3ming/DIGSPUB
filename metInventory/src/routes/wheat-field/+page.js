export async function load({fetch}) {
  const response = await fetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/436535"
  );
  const data = await response.json();
  return data;
}