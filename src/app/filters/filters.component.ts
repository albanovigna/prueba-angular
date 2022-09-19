import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  @Output() parametroAfiltrar = new EventEmitter<any>()
  @Output() groupFilters = new EventEmitter<any>();
  
  filterParam:any = []

  optionsStatus = [
    { name: "Alive", value: 1 },
    { name: "Dead", value: 2 },
    { name: "unknown", value: 3 },
  ]
  optionsGender= [
    { name: "Female", value: 1 },
    { name: "Male", value: 2 },
    { name: "Genderless", value: 3 },
    { name: "unknown", value: 4 }
  ]
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      status: new FormControl(''),
      specie: new FormControl(''),
      gender: new FormControl('')
    });
  }
  onFilterChange(filterValue: any): void {
    this.parametroAfiltrar.emit(filterValue)
  }

  search(filters: any): void {
    // console.log(filters)
    // Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    // this.groupFilters.emit(filters);
    this.parametroAfiltrar.emit(filters)
  }

}
