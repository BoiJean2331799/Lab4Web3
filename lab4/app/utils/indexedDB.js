import Localbase from 'localbase';

const db = new Localbase('blog-db');

export const savePostToIndexedDB = async (post) => {
    try {
        // Use add() for new posts
        await db.collection('posts').add(post);
        return true;
    } catch (error) {
        console.error('Error saving post to IndexedDB:', error);
        return false;
    }
};

export const updatePostInIndexedDB = async (id, postData) => {
    try {
        // First delete the old document
        await db.collection('posts').doc({ id }).delete();
        // Then add the updated version
        await db.collection('posts').add({
            ...postData,
            id
        });
        return true;
    } catch (error) {
        console.error('Error updating post in IndexedDB:', error);
        return false;
    }
};

export const deletePostFromIndexedDB = async (id) => {
    try {
        // Delete the post
        await db.collection('posts').doc({ id }).delete();
        
        // Delete all comments associated with this post
        const allComments = await db.collection('comments').get();
        const commentsToDelete = allComments.filter(comment => 
            comment.blogPostId === id || comment.blogPostId === String(id)
        );
        
        for (const comment of commentsToDelete) {
            await db.collection('comments').doc({ id: comment.id }).delete();
        }
        
        return true;
    } catch (error) {
        console.error('Error deleting post and its comments from IndexedDB:', error);
        return false;
    }
};

export const saveCommentToIndexedDB = async (comment) => {
    try {
        const commentToSave = {
            ...comment,
            id: comment.id || Date.now().toString()
        };
        await db.collection('comments').add(commentToSave);
        return true;
    } catch (error) {
        console.error('Error saving comment to IndexedDB:', error);
        return false;
    }
};