interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pending - lorem ipsum dolor sit amet',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'In Progress - Anim esse do consequat veniam veniam ea.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Finished - Deserunt eiusmod esse Lorem ipsum amet.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ],
};
