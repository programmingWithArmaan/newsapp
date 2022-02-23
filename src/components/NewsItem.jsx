import React, { Component } from "react";

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date } =
            this.props;

        return (
            <>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <img
                            src={imageUrl}
                            className="card-img-top"
                            alt={title}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    By {author ? author : "Anonymous"} on{" "}
                                    {new Date(date).toGMTString()}
                                </small>
                            </p>
                            <a
                                href={newsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-dark btn-sm"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
