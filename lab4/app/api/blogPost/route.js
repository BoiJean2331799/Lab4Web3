import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        const url = id 
            ? `http://localhost:3001/blogPost?id=${id}`
            : 'http://localhost:3001/blogPost';

        const response = await fetch(url);
        const data = await response.json();
        
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch posts' }, 
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const response = await fetch('http://localhost:3001/blogPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create post' }, 
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.json();
        
        const response = await fetch(`http://localhost:3001/blogPost/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update post' }, 
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        const response = await fetch(`http://localhost:3001/blogPost/${id}`, {
            method: 'DELETE'
        });
        
        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete post' }, 
            { status: 500 }
        );
    }
}