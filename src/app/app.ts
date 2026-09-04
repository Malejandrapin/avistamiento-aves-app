import { Component } from '@angular/core';
import { SightingFormComponent } from './components/sighting-form/sighting-form.component/sighting-form.component';
import { SightingListComponent } from './components/sighting-form/sighting-list.component/sighting-list.component';
import { StatisticsPanelComponent } from './components/sighting-form/sighting-panel.component/statistics-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SightingFormComponent, SightingListComponent, StatisticsPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  /** Se incrementa cada vez que se registra un avistamiento, para refrescar lista y estadísticas. */
  refreshTrigger = 0;

  onRegistered(): void {
    this.refreshTrigger++;
  }
}
