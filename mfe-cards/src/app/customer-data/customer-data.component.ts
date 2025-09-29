import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Card {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-customer-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-data.component.html',
  styleUrl: './customer-data.component.scss'
})
export class CustomerDataComponent {
  @Input() cardId: number | null = null;
  @Output() dataSelected = new EventEmitter<number>();

  customerData: Card[] = [
    { id: '1', title: 'Data A', description: 'Detalhes do Data A' },
    { id: '2', title: 'Data B', description: 'Detalhes do Data B' },
    { id: '3', title: 'Data C', description: 'Detalhes do Data C' },
  ];

  onDataClick(dataId: string): void {
    this.dataSelected.emit(parseInt(dataId));
  }
}
