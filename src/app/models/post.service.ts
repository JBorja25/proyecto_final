import { Injectable } from '@angular/core';
//importar modulo de db de firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';


//importar modulo nuestro
import { Post } from './post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore:AngularFirestore) {}

  //metodos para el crud
  /* getPosts(){
    return this.angularFirestore.collection("post")
                .snapshotChanges()
  } */
  getPostId(){
    return this.angularFirestore.collection("post")
                .get();
  }
  getPostsById(id){
    return this.angularFirestore.collection("post")
                .doc(id)
                .valueChanges()
  }
  createPosts(post: any){
      // return new Promise<any>((resolve, reject)=>{
        return this.angularFirestore.collection("post").add(post);
      // })
  }
  updatePost(post: any, idDoc: string){
      // return new Promise<any>((resolve, reject)=>{
        return this.angularFirestore.collection("post").doc(idDoc).update(post);
      // })
  }
  updatePosts(post:Post, id){
    return this.angularFirestore.collection("post")
    .doc(id)
    .update({
      address:post.address,
      email:post.email,
      fono:post.fono,
      name:post.name,

      
    });

  }
  deletePosts(post){
    return this.angularFirestore
    .collection("post")
    .doc(post.id)
    .delete();
  }


  actualizarAprobacion(aprobado: boolean, confirmacion: boolean, idDoc: string){
    return this.angularFirestore.collection('post').doc(idDoc).update({
      aprobado,
      confirmacion
    });
  }
}
