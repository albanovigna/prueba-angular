import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Output() parametroAfiltrar = new EventEmitter<any>()
  filterParam = ''
  options = [
    { name: "Alive", value: 1 },
    { name: "Dead", value: 2 },
    { name: "unknown", value: 3 },
    { name: "All", value: 4 }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onFilterChange(filterValue: any): void {
    this.parametroAfiltrar.emit(filterValue)
  }

}
