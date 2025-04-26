'use client';
import { useEffect, useState } from 'react';
import Comment from './Comment';

export default function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comments?blogPostId=${postId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId, refreshKey]);

    const refreshComments = () => {
        setRefreshKey(oldKey => oldKey + 1);
    };

    if (loading) return <div className="csWhite">Loading comments...</div>;

    return (
        <div id="comments" className="mt-4">
            {comments.length === 0 ? (
                <p className="csWhite">No comments yet.</p>
            ) : (
                comments.map(comment => (
                    <Comment 
                        key={comment.id}
                        author={comment.author || 'Anonymous'}
                        content={comment.content}
                    />
                ))
            )}
        </div>
    );
}