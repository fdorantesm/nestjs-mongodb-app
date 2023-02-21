import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class DateService {
  public create(date?: Date): Date {
    const instance = (
      date ? DateTime.fromJSDate(date) : DateTime.now()
    ).toUTC();

    return instance.toJSDate();
  }

  public withinRange(value: number, unit: string): { from: Date; to: Date } {
    const from = this.create();
    const to = DateTime.fromJSDate(this.create())
      .plus({ [unit]: value })
      .toJSDate();
    return { from, to };
  }

  public in(value: number, unit: string): Date {
    const now = DateTime.fromJSDate(this.create());
    return now.plus({ [unit]: value }).toJSDate();
  }
}
