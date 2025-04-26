'use server'
import { GET, POST, PUT, DELETE } from '../api/blogPost/route';
import { NextRequest } from 'next/server';

// Helper function to create a NextRequest
function createRequest(url, method, body = null) {
    const request = new NextRequest(url, {
        method,
        ...(body && { body: JSON.stringify(body) })
    });
    return request;
}

// Add a new blog post
export async function addBlogPost(formData) {
    try {
        const blogPostData = {
            title: formData.get('title'),
            content: formData.get('content'),
            date: new Date().toISOString()
        };

        const request = createRequest(
            'http://localhost:3000/api/blogPost',
            'POST',
            blogPostData
        );
        
        const response = await POST(request);
        if (!response.ok) throw new Error('Failed to add post');
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Update a blog post
export async function updateBlogPost(formData) {
    try {
        const id = formData.get('id');
        const blogPostData = {
            title: formData.get('title'),
            content: formData.get('content'),
            date: new Date().toISOString()
        };

        const request = createRequest(
            `http://localhost:3000/api/blogPost?id=${id}`,
            'PUT',
            blogPostData
        );
        
        const response = await PUT(request);
        if (!response.ok) throw new Error('Failed to update post');
        
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Delete a blog post and its comments
export async function deleteBlogPost(id) {
    try {
        // First get all comments for this blog post
        const getCommentsRequest = createRequest(
            `http://localhost:3000/api/comments?blogPostId=${id}`,
            'GET'
        );
        const commentsResponse = await fetch(getCommentsRequest);
        const comments = await commentsResponse.json();

        // Delete each comment individually
        const deletePromises = comments.map(comment => 
            fetch(`http://localhost:3000/api/comments/${comment.id}`, {
                method: 'DELETE'
            })
        );
        await Promise.all(deletePromises);

        // Then delete the post
        const deletePostRequest = createRequest(
            `http://localhost:3000/api/blogPost?id=${id}`,
            'DELETE'
        );
        const postResponse = await DELETE(deletePostRequest);
        if (!postResponse.ok) throw new Error('Failed to delete post');

        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Get a blog post
export async function getBlogPost(id) {
    try {
        const request = createRequest(
            `http://localhost:3000/api/blogPost?id=${id}`,
            'GET'
        );
        
        const response = await GET(request);
        if (!response.ok) throw new Error('Failed to fetch post');
        
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}