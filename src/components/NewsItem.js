import React, { Component } from "react";

export default class NewsItem extends Component {
  // to create constructor it is essential to mention the class name, which is super. Instead we will gonna face error issues

  render() {
    let { title, description, image, websiterendering, author, publisheddate } =
      this.props;
    return (
      <>
        <div>
          <div className="card">
            <img
              className="card-img-top"
              src={
                image == null
                  ? "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"
                  : image
              }
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title">
                {title == null ? "" : title.slice(0, 30)}...
              </h5>
              <p className="card-text">
                {description == null ? "" : description.slice(0, 100)}.... Read
                more
              </p>
              <p className="card-text">
                <small className="text-muted">
                  By {author ? author : "unknown"} Updated on{" "}
                  {new Date(publisheddate).toGMTString()}
                </small>
              </p>
              {/* to get exact date i will gonna create an object of new date with togmtstring which is a function of javascript to convert time into gmt */}
              <a
                href={websiterendering}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-dark"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
