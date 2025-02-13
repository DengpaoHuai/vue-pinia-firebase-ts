//https://crudcrud.com/api/c14232f51d1743ebac078af7a29af39f

const getCadeaux = async (page = 1) => {
  const response = await fetch('https://crudcrud.com/api/c14232f51d1743ebac078af7a29af39f/cadeau');
  const data = await response.json();
  return data;
};

export default getCadeaux;

const waitfor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getCadeau = async (id: string) => {
  await waitfor(2000);
  const response = await fetch(
    `https://crudcrud.com/api/c14232f51d1743ebac078af7a29af39f/cadeau/${id}`,
  );
  const data = await response.json();
  return data;
};

export const getCadeauConfig = (id: string) => ({
  queryKey: ['cadeau', id],
  queryFn: () => getCadeau(id as string),
  staleTime: 5000,
  refetchOnWindowFocus: true,
});
