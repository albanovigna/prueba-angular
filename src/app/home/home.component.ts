import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { FilterPipePipe } from '../pipes/filter-pipe.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FilterPipePipe]
})
export class HomeComponent implements OnInit {
  constructor(private RestService: RestService) {}
  // filterParam = '';
  filterParam:any = []
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
    // console.log(filterValue,"console");
    this.filterParam = filterValue;
    console.log(this.filterParam)
  }
}
