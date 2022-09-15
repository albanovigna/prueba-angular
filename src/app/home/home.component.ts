import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private RestService: RestService) {}
  filterParam = '';
 
  public characters: any = [];
  ngOnInit(): void {
    this.cargarCharacters();
  }
  public cargarCharacters() {
    this.RestService.get(
      // `https://albano-rick-and-morty-api.herokuapp.com/characters`
      `http://localhost:3001/characters`
    ).subscribe((data) => {
      this.characters = data;
    });
  }
  reciboData(filterValue:any):void{
    console.log(filterValue);
    this.filterParam = filterValue;
  }
}
