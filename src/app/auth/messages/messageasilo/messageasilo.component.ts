import { Component, Input, OnInit } from '@angular/core';
import { MensajesService } from '../../services/mensajes/mensajes.service';

@Component({
  selector: 'app-messageasilo',
  templateUrl: './messageasilo.component.html',
  styleUrls: ['./messageasilo.component.scss']
})
export class MessageasiloComponent implements OnInit {

  @Input() dataAsilo:any = {};
  // @Input() urlImg: string = '';
  

  mensaje: string = '';
  display: boolean = false;
  invitado: boolean = false;


  constructor(
    private msj: MensajesService
  ) { }

  ngOnInit(): void {
    // console.log(this.mostrarBox);
    
  }

  cambioValor(evento : any){
    this.mensaje = evento;
  }

  enviarMensaje(){
    if(this.mensaje === '' || this.mensaje === null){
      return;
    }
    console.log();
    
    // let data = {
    //   uidAsilo: 
    // }
    // this.msj.guardarMensajes()

  }

  iniciarChat(){
    this.display = true;
  }

  cerrar(){
    this.display = false;
  }

  iniciarInvitado(){
    this.invitado = true;
  }

}
