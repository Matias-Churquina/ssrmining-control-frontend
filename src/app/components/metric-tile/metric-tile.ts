import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-tile',
  templateUrl: './metric-tile.html',
  styleUrl: './metric-tile.scss'
})
export class MetricTile {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly hint = input<string>();
}
