import { User } from "../types/user.types";

export const existingUsersCheck = (
  users: User[],
  name: string,
  email: string
): { exists: boolean; fields: string[] } => {
  const userExists = users.some(
    (user) =>
      user.name.toLowerCase() === name.toLowerCase() ||
      user.email.toLowerCase() === email.toLowerCase()
  );

  if (!userExists) {
    return { exists: false, fields: [] };
  }

  const nameExists = users.some(
    (user) => user.name.toLowerCase() === name.toLowerCase()
  );
  const emailExists = users.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  const existingFields: string[] = [];
  if (nameExists) existingFields.push(`navn "${name}"`);
  if (emailExists) existingFields.push(`e-post "${email}"`);

  return { exists: true, fields: existingFields };
};

