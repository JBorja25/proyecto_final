import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogrechazar',
  templateUrl: './dialogrechazar.component.html',
  styleUrls: ['./dialogrechazar.component.scss']
})
export class DialogrechazarComponent implements OnInit {

  mensaje: string= '';

  constructor(
    private refdialog: MatDialogRef<DialogrechazarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  cerrar(){
    this.refdialog.close({mensaje: this.mensaje, v: false});
  }
  
  guardar(){
    this.refdialog.close({mensaje: this.mensaje, v: true});

  }

  cambioValor(){

  }

}
