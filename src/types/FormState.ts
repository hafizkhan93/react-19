export type FormState = {
  name: string;
  description: string;
  price: number;
  picture: string;
  errors?: { [key: string]: string };
};
