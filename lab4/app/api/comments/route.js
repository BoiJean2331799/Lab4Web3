import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const blogPostId = searchParams.get('blogPostId');
        
        const response = await fetch(`http://localhost:3001/comments?blogPostId=${blogPostId}`);
        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch comments' }, 
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        
        // Validate required fields
        if (!body.blogPostId || !body.content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const response = await fetch('http://localhost:3001/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                blogPostId: body.blogPostId,
                content: body.content,
                date: body.date || new Date().toISOString(),
                author: body.author || 'anonymous'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add comment');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to add comment' },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const blogPostId = searchParams.get('blogPostId');

        if (!blogPostId) {
            return NextResponse.json(
                { error: 'Missing blogPostId parameter' },
                { status: 400 }
            );
        }

        // First get all comments for this blog post
        const getResponse = await fetch(`http://localhost:3001/comments?blogPostId=${blogPostId}`);
        const comments = await getResponse.json();

        // Delete each comment individually
        const deletePromises = comments.map(comment => 
            fetch(`http://localhost:3001/comments/${comment.id}`, {
                method: 'DELETE'
            })
        );

        await Promise.all(deletePromises);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete comments' },
            { status: 500 }
        );
    }
}