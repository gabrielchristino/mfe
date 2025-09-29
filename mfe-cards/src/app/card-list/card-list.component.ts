import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Card {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  @Output() cardClicked = new EventEmitter<number>();

  cards: Card[] = [
    { id: 1, title: 'Cartão 1', description: 'Descrição do primeiro cartão.' },
    { id: 2, title: 'Cartão 2', description: 'Descrição do segundo cartão.' },
    { id: 3, title: 'Cartão 3', description: 'Descrição do terceiro cartão.' },
  ];

  onCardClick(cardId: number): void {
    this.cardClicked.emit(cardId);
  }
}

