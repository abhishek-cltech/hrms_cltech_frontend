import { Component, OnInit } from '@angular/core'; 
import { Observable } from 'rxjs';
import { navigation } from '../navigation/data';
import { NavItem } from '../navigation/nav-item';
 
@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  menuList:NavItem[]=navigation;
  constructor() { }
  ngOnInit(): void {}
}
