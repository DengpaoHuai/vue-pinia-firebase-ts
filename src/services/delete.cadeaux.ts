const waitfor = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const deleteCadeau = async (id: string) => {
  await waitfor(2000);
  const response = await fetch(
    `https://crudcrud.com/api/c14232f51d1743ebac078af7a29af39f/cadeau/${id}`,
    { method: 'DELETE' },
  );
  return true;
};
