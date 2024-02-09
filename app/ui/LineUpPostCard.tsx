import { PostInfo } from "@/app/lib/definitions";
import PostCard from "./PostCard";

const postsInfo: PostInfo[] = [
{
  id: "1",
  userid: "01",
  title: "title1",
  envTag: "Ubuntu",
  tagsComponent:["tag1", "tag2"],
  dateTime: new Date(),
},
{
  id: "2",
  userid: "01",
  title: "title2",
  envTag: "C",
  tagsComponent:["tag3", "tag4"],
  dateTime: new Date(),
},
{
  id: "3",
  userid: "02",
  title: "title3",
  envTag: "Go",
  tagsComponent:["tag5", "tag6"],
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