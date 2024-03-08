import { PostPreview } from "@/app/lib/definitions";
import PostCard from "./PostCard";

const postsInfo: PostPreview[] = [
{
  id: "1",
  title: "title1",
  main_tag: "Ubuntu",
  extra_tag:["tag1", "tag2"],
  content: "hoge",
  date_time: new Date(),
},
{
  id: "2",
  title: "title2",
  main_tag: "C",
  extra_tag:["tag3", "tag4"],
  content: "hoge",
  date_time: new Date(),
},
{
  id: "3",
  title: "title3",
  main_tag: "Go",
  extra_tag:["tag5", "tag6"],
  content: "hoge",
  date_time: new Date(),
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