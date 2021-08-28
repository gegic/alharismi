import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {PromptComponent} from '../prompt/prompt.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toHomePage(): void {
    this.router.navigate(['']);
  }
}
