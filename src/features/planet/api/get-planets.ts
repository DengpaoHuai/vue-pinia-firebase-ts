import { type Planet } from '@/types/planets.type';
import { useQuery } from '@tanstack/vue-query';

const waitfor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getPlanets = async () => {
  await waitfor(2000);
  const response = await fetch('https://swapi.dev/api/planets/');
  const data = await response.json();
  return data.results;
};

const usePlanets = () => {
  return useQuery<Planet[]>({
    queryKey: ['planets'],
    queryFn: getPlanets,
  });
};

export default usePlanets;
