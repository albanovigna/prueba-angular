import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(private RestService: RestService) {}
  public characters: any = [];
  ngOnInit(): void {
    this.cargarCharacters();
  }
  public cargarCharacters() {
    this.RestService.get(
      `https://albano-rick-and-morty-api.herokuapp.com/characters`
    ).subscribe((data) => {
      this.characters = data;
    });
  }
}
