import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from 'src/app/models/post.service';

@Component({
  selector: 'app-rechazados',
  templateUrl: './rechazados.component.html',
  styleUrls: ['./rechazados.component.scss']
})
export class RechazadosComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['nombre', 'direcicon', 'email', 'telefono', 'motivo'];
  
  dataSource = new MatTableDataSource;

  // @Input() datarechazdos: MatTableDataSource<any>
  

  @ViewChild(MatPaginator) pagaprobados: MatPaginator;

  postrechazados: any[] = [];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    // console.log(this.datarechazdos);
    
  }

  ngAfterViewInit(): void {
    // this.dataSource = this.datarechazdos
    // console.log(this.dataSource);
    
    this.cargarAsilosAprobados();
  }

  cargarAsilosAprobados(){
    this.postService.getPostId()
      .subscribe((resp:any) => {
        console.log(resp);
        // this.PostAprobados = [];
        this.postrechazados = [];
        for (let f of resp.docs) {
          console.log(f.data());

           if(!f.data().aprobado && f.data().rechazar){
            console.log('entra en rechazado');
            
            
            this.postrechazados.push(f.data());

            console.log(this.dataSource);
            
          }
        }
        this.dataSource=new MatTableDataSource(this.postrechazados);
        this.dataSource.paginator = this.pagaprobados;

      });
  }


  bucarValor(evento: any){
    let filtro: string = evento.value;
    filtro = filtro.trim();
    filtro = filtro.toLowerCase();
    this.dataSource.filter = filtro;
  }

}
