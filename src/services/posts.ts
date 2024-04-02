import { Post } from "../types";
import { getData } from "../utils/httpClient";

export function getUserPosts(userId: number) {
  return getData<Post[]>(`/posts?userId=${userId}`)
  .then(posts =>  posts.filter(
    post => post.userId === userId
  ))
}

