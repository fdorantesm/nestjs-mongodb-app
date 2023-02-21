import { Request } from 'express';

type User = { id: string; scopes: string[] };

export type UserRequest = Request & { user: User };
