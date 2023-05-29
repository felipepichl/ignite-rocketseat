import { IDateProvider } from "../model/IDateProvider";

class DateProviderInMemory implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    return Number(start_date) + Number(end_date);
  }
  convertToUTC(date: Date): string {
    return String(date);
  }
  dateNow(): Date {
    return new Date();
  }
  compareInDays(start_date: Date, end_date: Date): number {
    return Number(start_date) + Number(end_date);
  }
  addDays(days: number): Date {
    return new Date(days);
  }
  addHours(hours: number): Date {
    return new Date(hours);
  }
}

export { DateProviderInMemory };
