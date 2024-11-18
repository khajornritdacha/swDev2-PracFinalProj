import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      role: Role;
      token: string;
    };
  }
}

export enum Role {
  Admin = "admin",
  User = "user",
}
