export * from './auth.service';
import { AuthService } from './auth.service';
export * from './expenses.service';
import { ExpensesService } from './expenses.service';
export const APIS = [AuthService, ExpensesService];
