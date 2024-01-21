import Image from "next/image";
import Header from "./ui/Header";
import PostCard from "./ui/PostCard";

export default function Home() {
  return (
    <div>
      <Header />
      <PostCard /> 
    </div>
  );
}
