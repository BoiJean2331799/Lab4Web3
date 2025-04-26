'use client';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Footer() {
    return <>
    <footer className="text-center py-3 csSecondary csBorderT">
        <div className="mb-2">
            <i className="bi bi-facebook mx-2 fs-4"></i>
            <i className="bi bi-twitter mx-2 fs-4"></i>
            <i className="bi bi-linkedin mx-2 fs-4"></i>
        </div>
        <p className="csWhite">Centre d'Expertise et de Perfectionnement en Informatique</p>
        <p className="csWhite">2025</p>
    </footer>
    </>
}