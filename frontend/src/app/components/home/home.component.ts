import { Component, OnInit } from '@angular/core';
import {BASE_URL} from "../../services/baseUrl";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openSwaggerDoc(): void{
    window.open(BASE_URL + "/docs#/", "_blank");
  }
}
