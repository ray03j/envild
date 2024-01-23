import { PostInfo } from "@/app/lib/definitions";

const PostCard = (postInfo: PostInfo) => {
  return (
    <div className="m-2 w-64 h-32 rounded bg-gray-300 text-black">
      <div>
        <div className="text-3xl">{postInfo.title}</div>
        <div className="text-2xl">{postInfo.envTag}</div>
      </div>
        <div className="flex">
          {postInfo.tagsComponent && 
          postInfo.tagsComponent.map((tag, i) => (
            <div key={i} className="m-1">{tag}</div>
          ))}
        </div>
        <div>{postInfo.dateTime ? postInfo.dateTime.toLocaleString(): "" }</div>
    </div>
  );
};

export default PostCard;