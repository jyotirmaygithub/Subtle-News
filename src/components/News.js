import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spin from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  // chronology vise construtor,render,componentdidmount runs in this serial
  // main purpose of render is to show html on the page, thats why firstly render method render the html on the page and the componentmount function comes into play

  //may be i will gonna use component did mount for fetching data from api (here i am using news api so then i will gonna fetch data by using this api)
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      page: 1,
      numarticles: 0,
      loading: false,
    };
    let boldtitile = this.props.category;
    document.title = `Subtle News - ${
      boldtitile[0].toUpperCase() + boldtitile.slice(1)
    }`;
  }

  //here i am gonna make props types which will help me as a filter
  // in simple words its used to set the data type of props which we send from the app js
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  async componentDidMount() {
    this.props.progressbar(10)
    //it will be usable to fetch data from api
    this.setState({ loading: true });
    this.props.progressbar(30)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a156523b095d46e4b5154363280ba4ba&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.props.progressbar(50)
    let data = await fetch(url);
    let readabledata = await data.json();
    this.props.progressbar(80)
    this.setState({
      news: readabledata.articles,
      numarticles: readabledata.totalResults,
      loading: false,
    });
    this.props.progressbar(100)
  }

  //these below functions belongs to the buttons which i was using to show data by clicking on the button

  // togonext = async () => {
  //   console.log("by the way things are working fine, right now!");
  //   this.setState({ loading: true });
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=a156523b095d46e4b5154363280ba4ba&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pagesize}`;
  //   let data = await fetch(url);
  //   let readabledata = await data.json();
  //   this.setState({
  //     news: readabledata.articles,
  //     numarticles: readabledata.totalResults,
  //     page: this.state.page + 1,
  //     loading: false,
  //   });
  // };

  // toprevious = async () => {
  //   this.setState({ loading: true });
  //   // instead of using if and else here i directly write it down that code with disbaled attribute
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=a156523b095d46e4b5154363280ba4ba&page=${
  //     this.state.page - 1
  //   }&pageSize=${this.props.pagesize}`;
  //   let data = await fetch(url);
  //   let readabledata = await data.json();
  //   this.setState({
  //     news: readabledata.articles,
  //     numarticles: readabledata.totalResults,
  //     page: this.state.page - 1,
  //     loading: false,
  //   });
  // };

  fetchMoreData = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=a156523b095d46e4b5154363280ba4ba&page=${
      this.state.page + 1
    }&pageSize=${this.props.pagesize}`;
    let data = await fetch(url);
    let readabledata = await data.json();
    this.setState({
      news: this.state.news.concat(readabledata.articles),
      numarticles: readabledata.totalResults,
      page: this.state.page + 1,
      loading: false,
    });
    };
  render() {
    const { news } = this.state;
    let heading = this.props.category;
    return (
      <div className="container my-3">
        <h2 className="my-3">
          Subtle-News - Top {heading[0].toUpperCase() + heading.slice(1)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spin/>} 
        {/* here i am writing this below line of code like this so that i can show loading spinner at the time of data fetching */}
        {/* {this.state.loading && <Spin />} */}
        <InfiniteScroll
        // this method of infinite scroll i very helpful in getting data with just scroll
          dataLength={this.state.news.length}
          next={this.fetchMoreData}
          hasMore={this.state.news.length !== this.state.numarticles}
          loader={<Spin />}
        >
          <div className="container">
            <div className="row">
              {/* always remember && is always check condition "true" */}
              {news.map((elememt) => {
                let {
                  title,
                  description,
                  urlToImage,
                  url,
                  author,
                  publishedAt,
                } = elememt;
                return (
                  <div className="col-md-4 mb-5" key={elememt.url}>
                    <NewsItem
                      title={title}
                      description={description}
                      image={urlToImage}
                      websiterendering={url}
                      author={author}
                      publisheddate={publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* this below code is used for the purpose of next and previous button which i was using before, but now i am using infinte scroll method or part of the react  */}

        {/* <div className="container d-flex justify-content-around">
          <button
            disabled={this.state.page === 1}
            type="button"
            onClick={this.toprevious}
            className="btn btn-dark"
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.numarticles / this.props.pagesize)
            }
            type="button"
            onClick={this.togonext}
            className="btn btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}
