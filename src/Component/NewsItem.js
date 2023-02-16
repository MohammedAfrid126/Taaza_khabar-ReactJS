import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source} = this.props
        return (
            <>
                <div className="card container">
                    <div className='d-flex position-absolute top-0 end-0'>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='__black' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}
