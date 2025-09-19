"use client";

import dynamic from "next/dynamic";
const Blogs = dynamic(() => import("@/app/components/Blogs"), { ssr: false });

import Tabs from "@/app/components/ui/Tabs";
import Following from "@/app/components/FollowingPosts";

const tabMenu = [
    { name: "Blogs", content: <Blogs /> },
    { name: "Following", content: <Following /> },
];

export default function Home() {
    return <Tabs tabs={tabMenu} />;
}
