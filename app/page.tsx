import Blogs from "@/app/components/Blogs";

export default async function Home() {
    const res = await fetch(`http://localhost:3000/api/posts`);
    const data = await res.json();
    console.log(data)
    return (
        <div className="max-w-5xl mx-auto p-6">
            <Blogs data={data} />
        </div>
    );
};
