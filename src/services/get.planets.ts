const waitfor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getPlanets = async (page = 1) => {
  await waitfor(2000);
  const response = await fetch('https://swapi.dev/api/planets/?page=' + page);
  const data = await response.json();
  return data.results;
};

export default getPlanets;
