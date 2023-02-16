import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 10,
        category: "general"
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            testResults : 0
        }
        document.title = `${this.capitalize(this.props.category)} | Taaza Khabar`;
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        this.props.setProgress(50);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIkey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(75);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.updateNews();
    }


    // The below Function are used in buttons 

    // handlePrevious = async () => {
    //     // this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }

    // handleNext = async () => {
    //     // this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }

    fetchMoreData = async() => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIkey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    };

    render() {
        return (
            <>
                <h1 className="text-center mb-5">Taaza Khabar - Top {this.capitalize(this.props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <Spinner/>}
                >
                    <div className="container my-4">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://imgeng.jagran.com/images/2022/aug/breaking-news-21659498841909.jpg"} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>

                </InfiniteScroll>

                {/* // these are the buttons
                /* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevious} type="button" className="btn btn-dark">&larr; Previous</button>
                    <button disabled={(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))} onClick={this.handleNext} type="button" className="btn btn-dark">Next &rarr;</button>
                </div> */}
            </>
        );
    }
}
