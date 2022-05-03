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
  getPosts(){
    return this.angularFirestore.collection("post")
                .snapshotChanges()
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
}
