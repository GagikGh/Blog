import Blogs from "@/app/components/Blogs";
export default async function Home() {
    console.log('process.env.NEXT_PUBLIC_BBC_API_KEY', process.env.NEXT_PUBLIC_BBC_API_KEY);
    const res = await fetch(
        `https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts`
    );
    const data = await res.json();
    console.log(data)
    return (
        <div>
            <Blogs data={data} />
        </div>
    );
}
