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
    this.cargarCharacters();
    this.dataLiquidador = data
  }
  // ngOnChanges(): void {
  //   this.dataLiquidador =
  // }
 
 
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
    // console.log(filterValue, "filter value")
    console.log(this.filterParam)
  }
  // changeData(filterValue:any):void{
  //   this.dataLiquidador=filterValue
  // }
}
