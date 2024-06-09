export type BookEditionData = {
  description: string;
  title: string;
};

export async function loader(/*{ params }*/): Promise<BookEditionData> {
  return new Promise((resolve) => {
    resolve({
      title: 'Genki Study Resources',
      description: '3rd edition',
    });
  })
}