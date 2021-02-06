import Cookie from "js-cookie";

export const useUser = (): {
  userId: string,
  fullName: string,
  name: string,
  company: string,
  isSteakholder: string
} => {
  const userId = Cookie.get('userId') ?? "";
  const firstName = Cookie.get('firstName') ?? "";
  const lastName = Cookie.get('lastName') ?? "";
  const name = Cookie.get('name') ?? "";
  const company = Cookie.get('company') ?? "";
  const isSteakholder = Cookie.get('isSteakholder') ?? "";

  const fullName = `${firstName} ${lastName}`

  return {
    isSteakholder,
    userId,
    fullName,
    name,
    company
  }
}