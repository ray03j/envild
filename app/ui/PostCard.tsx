import { PostPreview } from "@/app/lib/definitions";

const PostCard = (postInfo: PostPreview) => {
  return (
    <div className="m-2 w-64 h-42 rounded bg-gray-300 text-black p-4">
      <div>
        <div className="text-2xl font-bold mb-2">{postInfo.title}</div>
        <div className="text-xl">{postInfo.main_tag}</div>
      </div>
      <div className="flex mt-2">
        {postInfo.extra_tag && 
          postInfo.extra_tag.map((tag, i) => (
            <div key={i} className="mr-2 bg-gray-200 p-1 rounded">{tag}</div>
          ))}
      </div>
      <div className="mt-2 text-gray-600">
        {postInfo.date_time ? postInfo.date_time.toLocaleString() : ""}
      </div>
    </div>
  );
};

export default PostCard;
