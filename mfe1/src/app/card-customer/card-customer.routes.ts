import { Routes } from '@angular/router';
import { CardCustomerComponent } from './card-customer.component';
// Exporte as rotas como uma constante
export const CARD_CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    component: CardCustomerComponent,
  }
];
