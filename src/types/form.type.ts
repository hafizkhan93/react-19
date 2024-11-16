export type FormState = {
  email: string;
  password: string;
};

export type FormAction = {
  type: "SET_FIELD";
  name: string;
  value: string;
};
