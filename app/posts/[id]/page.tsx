import Post from "@/app/components/Post";

export default async function PostPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);

    if (!res.ok) {
        return <p className="text-center mt-10">Article not found</p>;
    }

    const data = await res.json();

    if (data.error) {
        return <p className="text-center mt-10">{data.error}</p>;
    }

    return <Post data={data} id={id} />;
}
