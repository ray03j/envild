import { PostInfo } from "@/app/lib/definitions";

const PostCard = (postInfo: PostInfo) => {
  return (
    <div className="m-2 w-64 h-42 rounded bg-gray-300 text-black p-4">
      <div>
        <div className="text-2xl font-bold mb-2">{postInfo.title}</div>
        <div className="text-xl">{postInfo.envTag}</div>
      </div>
      <div className="flex mt-2">
        {postInfo.tagsComponent && 
          postInfo.tagsComponent.map((tag, i) => (
            <div key={i} className="mr-2 bg-gray-200 p-1 rounded">{tag}</div>
          ))}
      </div>
      <div className="mt-2 text-gray-600">
        {postInfo.dateTime ? postInfo.dateTime.toLocaleString() : ""}
      </div>
    </div>
  );
};

export default PostCard;
