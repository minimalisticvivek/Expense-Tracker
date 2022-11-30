import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  ExpensesService,
  Configuration,
  ConfigurationParameters,
  Expense,
} from 'src/swagger';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public expenseBody: any = {
    amount: '',
    desc: '',
    catg: '',
  };
  historyMode: boolean = false;
  downloadHistory: any = [];
  leaderboard: any = [];
  isPremium: boolean = false;
  editingMode: boolean = false;
  expenseID = '';
  expensesData: any;
  prevPage: any;
  currentPage: any;
  nextPage: any;
  lastPage: any;
  pages: any;
  totalInflow: String = '₹ 0.00';
  totalOutflow: String = '₹ 0.00';
  constructor(
    private router: Router,
    private authService: AuthService,
    private expensesService: ExpensesService
  ) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('token') == null) {
      this.router.navigateByUrl('/auth');
    }
    this.expensesService.checkpremium().subscribe(
      (response) => {
        response.isPremium ? (this.isPremium = true) : (this.isPremium = false);
        if (response.isPremium) {
          this.leaderboard = [];
          this.expensesService.showleaderboard().subscribe(
            (response) => {
              (response.users as Array<string>).map((entry: any) => {
                let name = entry.name;
                let total = 0;
                (response.expenses as Array<string>).map((expense: any) => {
                  expense.userId == entry.id ? (total += expense.amount) : null;
                });
                this.leaderboard.push({ name: name, expense: total });
              });
            },
            (err) => console.log(err)
          );
        }
      },
      (err) => console.log(err)
    );
    this.expensesService.getexpenses(1).subscribe(
      (response) => {
        this.prevPage = response.previousPage;
        this.pages = response.lastPage;
        this.currentPage = response.currentPage;
        this.nextPage = response.nextPage;
        this.lastPage = response.lastPage;
        this.expensesData = response.response;
        this.totalInflow = ('+₹' +
          ((response.positive as number) * 1)?.toLocaleString(
            'en-IN'
          )) as String;
        this.totalOutflow = ('-₹' +
          ((response.negative as number) == 0
            ? (response.negative as number) * 1
            : (response.negative as number) * -1
          )?.toLocaleString('en-IN')) as String;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addExpense() {
    this.expensesService.addexpense(this.expenseBody).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteExpenseHandler(id: any) {
    this.expensesService.deleteexpense(id).subscribe((response) => {
      this.ngOnInit();
    });
  }
  editExpenseHandler(id: any) {
    this.expenseID = id;
    this.editingMode = true;
    this.expensesService.getexpense(id).subscribe(
      (response) => {
        this.expenseBody = {
          amount: response.amount,
          catg: response.catg,
          desc: response.desc,
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }
  modifyExpense() {
    this.expensesService
      .editexpense(this.expenseID, this.expenseBody)
      .subscribe(
        (response) => {
          this.ngOnInit();
          this.editingMode = false;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  loadPageHandler(pageNo: any) {
    this.expensesService.getexpenses(pageNo).subscribe(
      (response) => {
        this.prevPage = response.previousPage;
        this.pages = response.lastPage;
        this.currentPage = response.currentPage;
        this.nextPage = response.nextPage;
        this.lastPage = response.lastPage;
        this.expensesData = response.response;
        this.totalInflow = ('+₹' +
          ((response.positive as number) * 1)?.toLocaleString(
            'en-IN'
          )) as String;
        this.totalOutflow = ('-₹' +
          ((response.negative as number) * -1)?.toLocaleString(
            'en-IN'
          )) as String;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  paginationHandler(event: any) {
    this.expensesService.updateitemsperpage(event.target.value).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  downloadHandler() {
    this.expensesService.downloadexpenses().subscribe(
      (response) => {
        console.log((response as any).text);
      },
      (err) => {
        console.log(err.error.text);
        window.location.href = err.error.text;
      }
    );
  }
  downloadHistoryHandler() {
    this.historyMode = !this.historyMode;
    this.expensesService.downloadhistory().subscribe(
      (response) => {
        this.downloadHistory = response;
        console.log(this.downloadHistory);
      },
      (err) => console.log(err)
    );
  }
  logout() {
    sessionStorage.removeItem('token');
    this.ngOnInit();
  }
}
