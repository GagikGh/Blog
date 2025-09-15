import Post from "@/app/components/Post";

export default async function PostPage({ params }: { params: { id: string } }) {

    const res = await fetch(
        `https://${process.env.NEXT_PUBLIC_BBC_API_KEY}.mockapi.io/posts/${params.id}`
    );
    const data = await res.json();

    if (!data) {
        return (
            <p className="text-center mt-10">Article not found</p>
        );
    }

    return (
        <Post data={data} id={params.id} />
    );
}
