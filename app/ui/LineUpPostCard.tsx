import { PostPreview } from "@/app/lib/definitions";
import PostCard from "./PostCard";

const postsInfo: PostPreview[] = [
{
  id: "1",
  title: "title1",
  mainTag: "Ubuntu",
  extraTag:["tag1", "tag2"],
  content: "hoge",
  dateTime: new Date(),
},
{
  id: "2",
  title: "title2",
  mainTag: "C",
  extraTag:["tag3", "tag4"],
  content: "hoge",
  dateTime: new Date(),
},
{
  id: "3",
  title: "title3",
  mainTag: "Go",
  extraTag:["tag5", "tag6"],
  content: "hoge",
  dateTime: new Date(),
},
]

const LineUpPostCard = () => {
  return (
    <div>
      {postsInfo.map((postInfo, i) =>(
        <PostCard key={i} {...postInfo} />
      ))}
    </div>
  );
};

export default LineUpPostCard;