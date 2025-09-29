import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ChangeDetectorRef,
  Type,
  EventEmitter,
} from '@angular/core';
import { loadRemoteModule, LoadRemoteModuleOptions } from '@angular-architects/module-federation';
import { CommonModule } from '@angular/common';

interface CardListComponent {
  cardClicked: EventEmitter<number>;
}

@Component({
  selector: 'app-card-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-customer.component.html',
  styleUrl: './card-customer.component.scss',
})
export class CardCustomerComponent implements OnInit, OnDestroy {
  selectedCardId: number | null = null;
  selectedDataId: number | null = null;

  @ViewChild('cardListContainer', { read: ViewContainerRef })
  cardListContainer!: ViewContainerRef;

  @ViewChild('customerDataContainer', { read: ViewContainerRef, static: false })
  customerDataContainer!: ViewContainerRef;

  private cardListComponentRef: ComponentRef<CardListComponent> | null = null;
  private customerDataComponentRef: ComponentRef<any> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    await this.loadCardListComponent();
  }

  ngOnDestroy(): void {
    this.cardListComponentRef?.destroy();
    this.customerDataComponentRef?.destroy();
  }

  private async loadCardListComponent(): Promise<void> {
    try {
      const { CardListComponent } = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './CardListComponent',
      });

      this.cardListContainer.clear();
      this.cardListComponentRef = this.cardListContainer.createComponent(CardListComponent as Type<CardListComponent>);
      this.cardListComponentRef.instance.cardClicked.subscribe((cardId: number) => {
        this.handleCardClick(cardId);
      });
    } catch (error) {
      console.error('Error loading CardListComponent:', error);
    }
  }

  private handleCardClick(cardId: number): void {
    this.selectedCardId = cardId;
    this.cdr.detectChanges(); // Ensure the view updates to show the container
    // Use setTimeout to ensure customerDataContainer is available in the next tick
    setTimeout(() => this.loadCustomerDataComponent(cardId));
  }

  private async loadCustomerDataComponent(cardId: number): Promise<void> {
    try {
      if (!this.customerDataComponentRef && this.customerDataContainer) {
        const { CustomerDataComponent } = await loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4202/remoteEntry.js',
          exposedModule: './CustomerDataComponent',
        });
        this.customerDataContainer.clear();
        this.customerDataComponentRef = this.customerDataContainer.createComponent(CustomerDataComponent);
        this.customerDataComponentRef.instance.dataSelected.subscribe((dataId: number) => {
          this.handleDataSelection(dataId);
        });
      }

      if (this.customerDataComponentRef) {
        this.customerDataComponentRef.instance.cardId = cardId;
        this.customerDataComponentRef.changeDetectorRef.detectChanges();
      }
    } catch (error) {
      console.error('Error loading CustomerDataComponent:', error);
    }
  }

  private handleDataSelection(dataId: number): void {
    this.selectedDataId = dataId;
    console.log(`O dado com ID ${dataId} foi selecionado no mfe-cards e recebido no mfe1.`);
    this.cdr.detectChanges();
  }
}
