'use client';

export default function Comment({ author, content }) {
    return (
        <div className="d-flex align-items-start mb-3 csBorderB">
            <i className="bi bi-person-circle fs-3 me-2 csIconComment"></i>
            <div>
                <p className="mb-1 csWhite"><strong>{author}</strong></p>
                <p className="csWhite">{content}</p>
            </div>
        </div>
    );
}