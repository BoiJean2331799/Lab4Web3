'use client';
import { useState } from 'react';
import { saveCommentToIndexedDB } from '../utils/indexedDB';

export default function AddComment({ postId, onCommentAdded }) {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        const commentData = {
            blogPostId: postId,
            content: comment,
            date: new Date().toISOString(),
        };

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData)
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            const savedComment = await response.json();
            // Save to IndexedDB after successful server creation
            await saveCommentToIndexedDB(savedComment);

            setComment('');
            if (onCommentAdded) {
                onCommentAdded();
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <textarea
                className="form-control csWhiteBackground mb-3"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comment..."
                disabled={isSubmitting}
            />
            <div className="d-flex justify-content-end">
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
}