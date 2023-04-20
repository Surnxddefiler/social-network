import posts from './post.module.css'
const Post = (props) =>{  // пропсы
    return(
      <div className={posts.posts}>
        <div className={posts.post__item}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlysovRqSseA4uUGlio_vESy9xFc5OS7jXOva3NlE&s"></img>
          <div className={posts.post__text}>{props.message}</div>
        </div>
      </div>
    )
}
export default Post;