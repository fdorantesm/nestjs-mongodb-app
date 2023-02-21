import { CheckUserPasswordCommandHandler } from './check-user-password/check-user-password.command.handler';
import { FindUserCommandHandler } from './find-user/find-user.command.handler';
import { GetLoginDataCommandHandler } from './get-login-data/get-login-data.command.handler';
import { RegisterCommandHandler } from './register/register.command.handler';

export * from './check-user-password/check-user-password.command';
export * from './check-user-password/check-user-password.command.handler';
export * from './find-user/find-user.command';
export * from './find-user/find-user.command.handler';
export * from './get-login-data/get-login-data.command';
export * from './get-login-data/get-login-data.command.handler';
export * from './register/register.command';
export * from './register/register.command.handler';

export const CommandHandlers = [
  CheckUserPasswordCommandHandler,
  FindUserCommandHandler,
  GetLoginDataCommandHandler,
  RegisterCommandHandler,
];
