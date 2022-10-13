export const createEmptyUser = (): UserInfo => ({
  id: 0,
  name: "",
  age: 0,
});

export const createUser = (
  id: number,
  name: string,
  age: number,
): UserInfo => ({
  id: id,
  name: name,
  age: age,
});
