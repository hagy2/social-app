
import { Post, Comment, User } from "../types";

const API_URL = "https://gorest.co.in/public/v2";

// all posts
export async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  } catch (err) {
    console.error("fetchPosts error:", err);
    return [];
  }
}

// one post
export async function fetchPost(postId: number): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${postId}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

// comments 
export async function fetchComments(postId: number): Promise<Comment[]> {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

// user details 
export async function fetchUser(userId: number): Promise<User> {
  const res = await fetch(`${API_URL}/users/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}


export async function fetchPostsWithUsers(): Promise<(Post & { user?: User })[]> {
  const posts = await fetchPosts();

  // Fetch each user related to post
  const postsWithUsers = await Promise.all(
    posts.map(async (post) => {
      try {
        const user = await fetchUser(post.user_id); // user_id exists in Gorest
        return { ...post, user };
      } catch {
        return { ...post, user: undefined };
      }
    })
  );

  return postsWithUsers;
}

export async function fetchFullPost(postId: number): Promise<{
  post: Post;
  user?: User;
  comments: Comment[];
}> {
  const post = await fetchPost(postId);
  const [user, comments] = await Promise.all([
    fetchUser(post.user_id),
    fetchComments(postId),
  ]);

  return { post, user, comments };
}
