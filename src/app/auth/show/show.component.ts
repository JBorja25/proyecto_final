import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
//importa el modelo 
import { Post } from 'src/app/models/post.model';
//importar servico
import { PostService } from 'src/app/models/post.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['NOMBRE', 'direcicon', 'email', 'telefono'];
  dataSource = new MatTableDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private postService: PostService) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  showFiller = false;
  Post: any[] = [];

  ngOnInit(): void {
    this.postService.getPostId()
      .subscribe((resp:any) => {
        console.log(resp);
        for (let f of resp.docs) {
          // console.log(f);

          this.Post.push({ data: f.data(), idDoc: f.id });
          this.dataSource=new MatTableDataSource<any>(this.Post);
        }

      });
    /* this.postService.getPosts().subscribe((res)=>{
      this.Post= res.map((e)=>{
        return {
          id:e.payload.doc.id,
          ...(e.payload.doc.data() as Post)
        };
      });
    }); */
  }

  deleteRow = (post) => this.postService.deletePosts(post);

  aprobar(post: any) {
    console.log(post);

    this.postService.actualizarAprobacion(true, false, false, post.idDoc)
      .then((resp) => {
        console.log(resp);

      });

  }

}
