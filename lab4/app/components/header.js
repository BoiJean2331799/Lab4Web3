'use client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigation } from '../context/NavigationContext';

export default function Header() {
    const { navigateToHome } = useNavigation();
    
    return <>
    <nav className="navbar navbar-expand-lg py-3 csSecondary csBorderB">
        <div className="container-fluid d-flex align-items-center px-5">
            <div className="d-none d-lg-flex justify-content-center align-items-center h-100 w-25">
                <a onClick={navigateToHome} style={{cursor: 'pointer'}}>
                    <img src="/icon.PNG" alt="Logo" className="w-100 rounded-3 csBorder"/>
                </a>
            </div>
            <div className="d-lg-none d-flex justify-content-center align-items-center h-100 w-75">
                <a onClick={navigateToHome} style={{cursor: 'pointer'}}>
                    <img src="/icon.PNG" alt="Logo" className="w-100 rounded-3 csBorder"/>
                </a>
            </div>
            <button className="navbar-toggler csBorder" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <div className="d-flex justify-content-lg-evenly flex-lg-row flex-column align-items-center w-100">
                    <a className="nav-link p-lg-0 p-1 text-primary csText" href="#">Menu1</a>
                    <a className="nav-link p-lg-0 p-1 text-primary csText" href="#">Menu2</a>
                    <a className="nav-link p-lg-0 p-1 text-primary csText" href="#">Menu3</a>
                    <a className="nav-link p-lg-0 p-1 text-primary csText" href="#">Menu4</a>
                </div>
            </div>
            <div className="d-none d-lg-flex justify-content-center align-items-center h-100 w-25">
                <i className="bi bi-person-circle csUserIcon"></i>
            </div>
        </div>
    </nav>
    </>
}