'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [selectedPostId, setSelectedPostId] = useState(null);

    // Update selectedPostId based on pathname
    useEffect(() => {
        const match = pathname.match(/\/blog\/(\d+)/);
        if (match) {
            setSelectedPostId(match[1]);
        } else if (pathname === '/') {
            setSelectedPostId(null);
        }
    }, [pathname]);

    const navigateToBlogPost = (postId) => {
        setSelectedPostId(postId);
        router.push(`/blog/${postId}`);
    };

    const navigateToHome = () => {
        setSelectedPostId(null);
        router.push('/');
    };

    return (
        <NavigationContext.Provider value={{
            currentPage: pathname === '/' ? 'home' : 'blogPost',
            selectedPostId,
            navigateToBlogPost,
            navigateToHome
        }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
}