import Blogs from "@/app/components/Blogs";

export default async function Home() {
    const res = await fetch(
        `https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts?limit=10&page=1`,
    );
    const data = await res.json();

    return (
        <div className="max-w-5xl mx-auto p-6">
            <Blogs data={data} />
        </div>
    );
};
