import { PostType } from "../types/type";

const Post = ({ post }: { post: PostType }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src="https://placehold.co/150x150"
            alt="User Avatar"
          />
          <div>
            <h2 className="font-semibold text-md">{post.author?.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{post?.content}</p>
      </div>
    </div>
  );
};

export default Post;
