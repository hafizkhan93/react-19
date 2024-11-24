export type FormAction =
  | { type: "update"; field: string; value: string }
  | { type: "validate"; field: string }
  | { type: "submit" };
