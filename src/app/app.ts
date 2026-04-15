import { Component } from '@angular/core';
import { QUADRANT_CONFIGS, QuadrantConfig } from './models';
import { Sidebar } from './components/sidebar/sidebar';
import { Quadrant } from './components/quadrant/quadrant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, Quadrant],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly quadrantConfigs: QuadrantConfig[] = QUADRANT_CONFIGS;
}
