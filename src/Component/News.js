import React,{useState, useEffect} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

    News.defaultProps = {
        country: "in",
        pageSize: 10,
        category: "general"
    };

    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async()=>{
        props.setProgress(50);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.APIkey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(75);
        let parsedData = await data.json();
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    
    useEffect(() => {
        document.title = `${capitalize(props.category)} | Taaza Khabar`;
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.APIkey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };
        return (
            <>
                <h1 className="text-center" style={{marginTop : "70px",marginBottom : "30px"}}>Taaza Khabar - Top {capitalize(props.category)} Headlines</h1>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={loading && <Spinner/>}
                >
                    <div className="container my-4">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://imgeng.jagran.com/images/2022/aug/breaking-news-21659498841909.jpg"} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
}
