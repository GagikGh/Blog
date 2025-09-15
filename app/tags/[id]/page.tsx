import PostsByTag from "@/app/components/PostsByTag";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/tag/${id}`);

    if (!response.ok) {
        return <p className="text-center mt-10">Article not found</p>;
    }

    const postsByTag = await response.json();

    return (
        <PostsByTag posts={postsByTag} />
    );
}
