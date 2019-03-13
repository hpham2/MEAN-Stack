import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { p } from '@angular/core/src/render3';
import { Router } from '@angular/router';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`; // ``sign allows to add values to a normal string.

    /** pipe is to chain operators before subscribe */
    this.http.get<{ message: string, posts: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams)
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          }),
          maxPosts: postData.maxPosts
        }
      }))
      .subscribe(tranformedPostData => {
        this.posts = tranformedPostData.posts;
        /**...this.post just create the copy of it */
        this.postUpdated.next({
          posts: [...this.posts], 
          postCount: tranformedPostData.maxPosts
        })
      });

    /** [...a] copy of a */
    return [...this.posts];
  }

  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData)
      .subscribe((res) => {
        this.router.navigate(['/']);
      })
  }

  getPost(id: string) {
    return { ...this.posts.find(p => p.id === id) };
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    // const postData: Post = { 
    //   id: id, 
    //   title: title, 
    //   content: content, 
    //   imagePath: null 
    // };
    let postData: Post | FormData;
    if (typeof image === "object") {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      }
    }
    this.http
      .put("http://localhost:3000/api/posts/" + id, postData)
      .subscribe(response => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    return this.http.delete("http://localhost:3000/api/posts/" + postId);
  }
}
