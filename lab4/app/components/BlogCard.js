'use client';
import { useNavigation } from '../context/NavigationContext';

export default function BlogCard({ id, title, content, date }) {
    const { navigateToBlogPost } = useNavigation();
    
    return (
        <div className="col-10 col-lg-4 p-2">
            <div 
                className="csBorder rounded-3 csHover" 
                onClick={() => navigateToBlogPost(id)} 
                style={{cursor: 'pointer'}}
            >
                <div className="card csSecondary">
                    <div className="text-decoration-none text-reset">
                        <img 
                            src="/blogPost.jpg" 
                            className="card-img-top" 
                            alt="post icon" 
                        />
                        <div className="card-body">
                            <h5 className="card-title text-primary csText">{title}</h5>
                            <p className="card-text csWhite">{content}</p>
                        </div>
                        <div 
                            className="card-footer text-body-secondary" 
                            style={{height: "45px"}}
                        >
                            <p className="csWhite">{date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}