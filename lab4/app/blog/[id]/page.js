'use client';
import React, { useState } from 'react';
import BlogDetails from '../../components/BlogDetails';
import AddComment from '../../components/AddComment';
import CommentList from '../../components/CommentList';
import { useNavigation } from '../../context/NavigationContext';
import { updatePostInIndexedDB, deletePostFromIndexedDB } from '../../utils/indexedDB';

export default function BlogPost({ params }) {
    const { navigateToHome } = useNavigation();
    const resolvedParams = React.use(params);
    const [commentRefreshKey, setCommentRefreshKey] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const handleCommentAdded = () => {
        setCommentRefreshKey(prev => prev + 1);
    };

    const handleUpdate = async () => {
        if (isEditing) {
            const updatedPost = {
                id: resolvedParams.id,
                title: formData.title,
                content: formData.content,
                date: new Date().toISOString()
            };

            try {
                // Update server
                const response = await fetch(`/api/blogPost?id=${resolvedParams.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedPost),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to update post');
                }

                // Save to IndexedDB after successful server update
                await updatePostInIndexedDB(resolvedParams.id, updatedPost);

                setIsEditing(false);
                window.location.reload();
            } catch (error) {
                alert('Failed to update post: ' + error.message);
            }
        } else {
            // Enter edit mode
            const titleElement = document.querySelector('.blog-title');
            const contentElement = document.querySelector('.blog-content');
            
            setFormData({
                title: titleElement?.textContent || '',
                content: contentElement?.textContent || ''
            });
            setIsEditing(true);
        }
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            try {
                // Delete from server
                const response = await fetch(`/api/blogPost?id=${resolvedParams.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete post');
                }

                // Try to delete from IndexedDB, but don't block navigation if it fails
                try {
                    await deletePostFromIndexedDB(resolvedParams.id);
                } catch (indexedDBError) {
                    console.warn('Failed to delete from IndexedDB:', indexedDBError);
                }

                navigateToHome();
            } catch (error) {
                alert('Failed to delete post: ' + error.message);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="csPrimary py-4">
            <div className="container d-flex flex-column align-items-center">
                <div className="row col-12">
                    <div className="d-flex justify-content-between my-5">
                        <button 
                            className="csButton csWhite"
                            onClick={handleUpdate}
                        >
                            {isEditing ? 'Save Changes' : 'Update Post'}
                        </button>
                        <button 
                            className="csButton csWhite"
                            onClick={handleDelete}
                        >
                            Delete Post
                        </button>
                    </div>
                    <img 
                        src="/blogPoster.png" 
                        alt="Blog Featured Image" 
                        className="rounded-3 csBorder p-0" 
                    />
                </div>
                {isEditing ? (
                    <div className="w-100 mt-4">
                        <div className="mb-3">
                            <label className="form-label csWhite">Title</label>
                            <input
                                type="text"
                                className="form-control csInputs"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label csWhite">Content</label>
                            <textarea
                                className="form-control csInputs"
                                name="content"
                                rows="5"
                                value={formData.content}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>
                    </div>
                ) : (
                    <BlogDetails postId={resolvedParams.id} />
                )}
            </div>
            
            <div className="container my-5">
                <h4 className="csWhite">Comments</h4>
                <AddComment postId={resolvedParams.id} onCommentAdded={handleCommentAdded} />
                <CommentList postId={resolvedParams.id} key={commentRefreshKey} />
            </div>
        </div>
    );
}