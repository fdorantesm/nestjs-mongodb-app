import { ICommand } from '@nestjs/cqrs';

export class GetLoginDataCommand implements ICommand {
  constructor(public email: string) {}
}
