// /home/gabriel/Documents/mfe/mfe1/src/app/card-detail/card-detail.component.ts
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for AsyncPipe
import { map } from 'rxjs';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to imports
  template: `
    <h3>Detalhe do Cartão (mfe1)</h3>
    <p>Você selecionou o cartão com ID: <strong>{{ cardId$ | async }}</strong></p>
  `,
})
export class CardDetailComponent {
  private route = inject(ActivatedRoute);
  cardId$ = this.route.paramMap.pipe(map((params) => params.get('id')));
}
