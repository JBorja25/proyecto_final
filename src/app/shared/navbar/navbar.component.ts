import { AuthService } from './../../auth/services/auth.service';
import { AfterContentInit, AfterViewInit, Component,  } from '@angular/core';
import { provideRoutes, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService],
})
export class NavbarComponent implements AfterViewInit {

 
  public user$: Observable <any>=  this.authSvc.afAuth.user;

  tipo: string = '';

  constructor(public authSvc:AuthService ,private router:Router) {
    
   }

   ngAfterViewInit(): void {
    this.tipo = localStorage.getItem('tipo');
     
   }

  async onLogout(){
    try {
     await  this.authSvc.logout();
    //  this.router.navigate(['/login']);

    } catch (error) {
      console.log(error);
      return error;
    }
   
  }

}
