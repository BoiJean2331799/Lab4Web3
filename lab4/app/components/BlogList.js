'use client';
import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';

export default function BlogList() {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blogPost');
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                const data = await response.json();
                setBlogPosts(data);
            } catch (error) {
                console.error('Error fetching blogPost data:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container w-100 px-0 mx-0">
            <div className="row m-0 w-100 justify-content-lg-start justify-content-center">
                {blogPosts.map(post => (
                    <BlogCard 
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        date={post.date}
                    />
                ))}
            </div>
        </div>
    );
}