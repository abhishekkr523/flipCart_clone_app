import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-state">
      <fa-icon *ngIf="icon" [icon]="icon" class="empty-state__icon"></fa-icon>
      <p class="empty-state__message">{{ message }}</p>
      <button *ngIf="actionLabel" class="empty-state__action" (click)="action.emit()">{{ actionLabel }}</button>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--fk-space-2);
      padding: var(--fk-space-5) var(--fk-space-3);
      text-align: center;
    }
    .empty-state__icon {
      font-size: 40px;
      color: var(--fk-text-secondary);
    }
    .empty-state__message {
      color: var(--fk-text-secondary);
      font-size: var(--fk-font-md);
      margin: 0;
    }
    .empty-state__action {
      margin-top: var(--fk-space-2);
      padding: var(--fk-space-2) var(--fk-space-4);
      background: var(--fk-blue);
      color: var(--fk-white);
      border: none;
      border-radius: var(--fk-radius-sm);
      font-weight: 600;
      cursor: pointer;
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon?: IconDefinition;
  @Input() message = '';
  @Input() actionLabel?: string;
  @Output() action = new EventEmitter<void>();
}
