import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RestService } from '../services/rest.service';
import { FilterPipePipe } from '../pipes/filter-pipe.pipe';
import data from "../data/infoLiquidador.json"

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
  dataLiquidador:any = []
  public characters: any = [];
  ngOnInit(): void {
    // this.cargarCharacters();
    this.dataLiquidador = data
  }
  
 
  public cargarCharacters() {
    this.RestService.get(
      `http://localhost:3001/characters`
    ).subscribe((data) => {
      this.characters = data;
    });
  }
  reciboData(filterValue:any):void{
    this.filterParam = filterValue;
    console.log(this.filterParam)
  }
  
}
