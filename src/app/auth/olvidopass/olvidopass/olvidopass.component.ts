import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-olvidopass',
  templateUrl: './olvidopass.component.html',
  styleUrls: ['./olvidopass.component.scss']
})
export class OlvidopassComponent implements OnInit {

  correo:string = '';

  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  reset(correo: any){
    this._auth.passOlvido(correo)
    .then((resp)=>{
      alert(`${resp} correo enviado`);

      this.correo = '';
      
    })
    .catch((error)=>{
      alert(error);
    })
  }

}
