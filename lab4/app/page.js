'use client';
import { useNavigation } from './context/NavigationContext';
import BlogList from './components/BlogList';

export default function Home() {
    const { currentPage, selectedPostId, navigateToHome } = useNavigation();
    
    return (
        <>
            {currentPage === 'home' ? (
                <div className="csPrimary py-4 d-flex flex-column align-items-center">
                    <div className="container-fluid mb-4 px-0 mx-0 w-75">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <input 
                                type="text" 
                                className="csInputs w-100 w-md-50 mb-3 mb-md-0 csWhiteBackground csFocus" 
                                placeholder="Rechercher..." 
                            />
                            <div className="d-flex align-items-center w-100 w-md-50 justify-content-between">
                                <div className="w-50 d-lg-flex justify-content-lg-center">
                                    <label htmlFor="sort" className="text-primary csText">Trier par:</label>
                                </div>
                                <select id="sort" className="w-50 csWhiteBackground csFocus csInputs">
                                    <option value="select">Select</option>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <BlogList />
                </div>
            ) : (
                <Blog 
                    postId={selectedPostId} 
                    onBack={navigateToHome}
                />
            )}
        </>
    );
}