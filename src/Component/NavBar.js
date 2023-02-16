import React from 'react'
import {Link, useLocation} from 'react-router-dom'

export default function NavBar() {
    let location = useLocation();
    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/general">Taaza Khabar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">LI
                            <li className="nav-item"><Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/general">Home</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname==="/business"?"active":""}`} to="/business">Business</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname==="/entertainment"?"active":""}`} to="/entertainment">Entertainment</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname==="/general"?"active":""}`} to="/general">General</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname==="/health"?"active":""}`} to="/health">Health</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname==="/science"?"active":""}`} to="/science">Science</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname==="/sport"?"active":""}`} to="/sports">Sports</Link></li>
                            <li className="nav-item"><Link className={`nav-link ${location.pathname==="/"?"active":"technology"}`} to="/technology">Technology</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}