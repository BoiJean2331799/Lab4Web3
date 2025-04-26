'use client';
import { useEffect, useState } from 'react';

export default function BlogDetails({ postId }) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/blogPost?id=${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch post data');
                }
                const data = await response.json();
                setPost(data[0]);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <div className="text-center csWhite">Loading...</div>;
    if (error) return <div className="text-center text-danger">Error: {error}</div>;
    if (!post) return <div className="text-center csWhite">Post not found</div>;

    return (
        <div className="row w-100">
            <h2 className="text-center my-4 text-primary csBlogTitle blog-title">{post.title}</h2>
            <p className="csWhite blog-content">{post.content}</p>
            <div className="text-center my-4">
                <img 
                    src="/blogPost.jpg" 
                    className="rounded-3 csBorder p-0 csHover" 
                    alt="Caption" 
                />
                <p className="mt-2 text-primary csText">{post.author}</p>
            </div>
            <p className="csWhite blog-content">{post.content}</p>
        </div>
    );
}