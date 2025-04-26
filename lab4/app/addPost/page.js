'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { savePostToIndexedDB } from '../utils/indexedDB';

export default function AddPost() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!confirm('Are you sure you want to submit?')) {
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const blogPostData = {
            title: formData.get('title'),
            author: formData.get('author'),
            content: formData.get('content'),
            date: formattedDate
        };

        try {
            const response = await fetch('/api/blogPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogPostData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const savedPost = await response.json();
            // Save to IndexedDB after successful server creation
            await savePostToIndexedDB(savedPost);

            router.push('/'); // Redirect to home page
        } catch (error) {
            console.error('error while adding post', error);
            router.push('/'); // Redirect to home page in case of error
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="csWhite">Add a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="postTitle" className="form-label csWhite">Blog Post Title</label>
                    <input
                        type="text"
                        className="form-control csInputs"
                        id="postTitle"
                        name="title"
                        placeholder="Enter the blog post title"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label csWhite">Blog Post Author</label>
                    <input
                        type="text"
                        className="form-control csInputs"
                        id="author"
                        name="author"
                        placeholder="Enter the blog post author"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label csWhite">Post Description</label>
                    <textarea
                        className="form-control csInputs"
                        id="description"
                        name="content"
                        rows="3"
                        placeholder="Enter the blog post description"
                        required
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="btn csButton csWhite"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Adding Post...' : 'Add Post'}
                </button>
            </form>
        </div>
    );
}