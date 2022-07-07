import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MensajesService } from '../../services/mensajes/mensajes.service';

@Component({
  selector: 'app-messageasilo',
  templateUrl: './messageasilo.component.html',
  styleUrls: ['./messageasilo.component.scss']
})
export class MessageasiloComponent implements OnInit {

  @Input() dataAsilo:any = {};
  // @Input() urlImg: string = '';
  

  mensajeGroup: FormGroup;
  subscription: Subscription[] = [];
  mensaje: number = 0;
  display: boolean = false;
  invitado: boolean = false;
  finalizarChat: boolean = false;
  idDocumento: string = '';
  uidUser: string = '';
  hora = new Date();
  dataMensajes: any;
  minutos = (this.hora.getMinutes() < 10) ? '0'+this.hora.getMinutes() : this.hora.getMinutes();

  mostrarBox: boolean = false;


  constructor(
    private msj: MensajesService,
    private _auth: AuthService,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // 
    // this.getMensajes();
    this.crearFormulario();
  }

  
  crearFormulario(){
    this.mensajeGroup = this._fb.group({
      mensaje: ['']
    })
  }

  enviarMensaje(){
    
    // 
    this.mensaje = this.mensajeGroup.get('mensaje').value.length;
    // console.log();
    
    
    if(this.mensajeGroup.invalid){
      return;
    }
    let mensajes: any = {};
    if(this.invitado){
      this._auth.anonimoUser()
      .onAuthStateChanged((user) =>{
        

        if(this.idDocumento.length > 0){
          console.log(this.mensajeGroup.get('mensaje').value);
          console.log(this.idDocumento);
          
          this.msj.updateMensajes(this.dataMensajes, this.mensajeGroup.get('mensaje').value, user.uid, this.idDocumento)
          .then(() =>{
            // this.dataMensajes = [];
            this.msj.getMensajesId(this.idDocumento)
            .subscribe((resp) =>{
              console.log(resp.data());
              
              this.dataMensajes = resp.data();
              // this.uidUser = user.uid;
              this.mensajeGroup.reset()
              
            })
            
          })

        }else{
          mensajes = {
                uid: user.uid,
                mensaje: this.mensajeGroup.get('mensaje').value,
                time: this.hora.getTime(),
                hora: `${this.hora.getHours()}:${this.hora.getMinutes() < 10 ? '0'+this.hora.getMinutes() : this.hora.getMinutes()}:${ this.hora.getSeconds() < 10 ? '0'+this.hora.getSeconds() : this.hora.getSeconds()}`
              }
          this.msj.guardarMensajes(mensajes)
          .then((resp) =>{
            
            // this.idDocumento = '';
            // this.dataMensajes = [];
            this.idDocumento = resp.id;
            this.msj.getMensajesId(this.idDocumento)
            .subscribe((resp) =>{
              console.log(resp.data());
              console.log(this.idDocumento);
              
              this.dataMensajes = resp.data();
              this.uidUser = user.uid;
              this.mensajeGroup.reset()
            })
          })
          .catch((error) =>{
    
          });
        }
  
      })
    }
  }

  getMensajes(){
    this.subscription.push(
      this.msj.getMensajes()
      .subscribe((resp) =>{
        
        for(let f of resp.docs){
          
          
        }
        
      })
    )
  }

  generarId(){
    let d = new Date().getTime();
    
    
    let uuid = 'xxxxxyfxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (d + Math.random() * 16 ) % 16 | 0;
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  iniciarChat(){
    this.display = true;
  }

  cerrar(){
    this.display = false;
  }

  iniciarInvitado(){
    this._auth.anonimo()
    .then((resp) =>{
      
      this.invitado = true;
      this.mostrarBox = false;
      
    })
    .catch((error) =>{
      
      
    })
  }
  finalizarChatFun(){
    this.finalizarChat = true;
  }

  cancelar(){
    this.finalizarChat = false;
  }

  confirmar(){
    this.invitado = false;
    this.mostrarBox = false;
    this.display = false;
    this.finalizarChat = false;
  }

  minimizar(){
    if(this.invitado && this.display && !this.mostrarBox){
      this.invitado = false;
    }
  }

  botonMostrarBox(){
    if(this.invitado && this.display && !this.mostrarBox){
      this.invitado = false;
    }else{
      if(!this.invitado && this.display && !this.mostrarBox){
        this.invitado = true;
      }else{
        
        
        this.mostrarBox = !this.mostrarBox;
        
      }
    }
    
  }

}
