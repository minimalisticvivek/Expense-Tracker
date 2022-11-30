import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpensesService } from 'src/swagger';
import { WindowRefService } from '../window-ref.service';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
  providers: [WindowRefService],
})
export class PricingComponent implements OnInit {
  razorpayKeyID: string = 'rzp_test_MPJj4ZO1IeYlzh';
  razorpaySecret: string = 'XW3SvSuRi3NmhYPADGtZLiqe';
  options: object = {};

  constructor(
    private router: Router,
    private expensesService: ExpensesService,
    private winRef: WindowRefService
  ) {}
  ngOnInit(): void {
    sessionStorage.getItem('token') == null
      ? this.router.navigateByUrl('/auth')
      : null;
  }
  handlePayment(event: any) {
    this.options = {
      key: this.razorpayKeyID,
      amount: `${parseInt(event.target.id) * 100}`,
      currency: 'INR',
      name: 'Premium Membership',
      description: 'Buy Expense Tracker Premium Membership',
      // "order_id": state.token,
      callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
      handler: (response: any) => {
        this.createPremium();
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    const rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  }
  createPremium() {
    this.expensesService.updatetopremium().subscribe(
      (response) => {
        console.log(response);
        alert('Payment Successful!');
        this.router.navigateByUrl('/dashboard');
      },
      (err) => console.log(err)
    );
  }
}
