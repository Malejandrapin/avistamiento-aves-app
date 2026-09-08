import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Headercomponent} from '../header/headercomponent/headercomponent'

@Component({
  selector: 'app-mainlayoutcomponent',
  imports: [RouterOutlet, Headercomponent],
  templateUrl: './mainlayoutcomponent.html',
  styleUrl: './mainlayoutcomponent.scss',
})
export class Mainlayoutcomponent {}
