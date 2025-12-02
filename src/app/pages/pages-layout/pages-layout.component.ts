import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pages-layout',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './pages-layout.component.html',
  styleUrl: './pages-layout.component.scss'
})
export class PagesLayoutComponent {

  constructor(private router: Router){}

  logout(){
  this.router.navigate(['/login'])
}

}
