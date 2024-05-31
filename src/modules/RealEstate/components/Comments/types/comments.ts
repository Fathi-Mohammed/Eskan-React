type user = {
  name: string;
  image: string;
};

export type comment = {
  id: number;
  comment: string;
  created_at: string;
  user: user;
};
