import { ICommand } from '@nestjs/cqrs';

export class CheckUserPasswordCommand implements ICommand {
  constructor(public email: string, public password: string) {}
}
