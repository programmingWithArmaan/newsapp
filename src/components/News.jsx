import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };

        document.title = `${this.capitalizeFirstLetter(
            this.props.category
        )} - NewsMonkey`;
    }

    async componentDidMount() {
        this.props.setProgress(0);
        this.setState({ loading: true });

        let data = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3af101f232ed43adaff76ca47a7da712&page=${this.state.page}&pageSize=${this.props.pageSize}`
        );

        this.props.setProgress(30);

        let parsedData = await data.json();

        this.props.setProgress(50);

        this.setState({
            loading: false,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
        });
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1,
        });

        let data = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=dbe57b028aeb41e285a226a94865f7a7&page=${this.state.page}&pageSize=${this.props.pageSize}`
        );

        let parsedData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
        });
    };

    render() {
        return (
            <>
                <h2 className="text-center my-4">
                    NewsMonkey - Top{" "}
                    {this.capitalizeFirstLetter(this.props.category)} Headlines
                </h2>

                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={
                        this.state.articles.length != this.state.totalResults
                    }
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((article) => {
                                return (
                                    <NewsItem
                                        key={article.url}
                                        title={
                                            article.title ? article.title : ""
                                        }
                                        description={
                                            article.description
                                                ? article.description
                                                : ""
                                        }
                                        imageUrl={
                                            article.urlToImage
                                                ? article.urlToImage
                                                : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.hs0fEx2e_g6nWamwBxXUyQHaFj%26pid%3DApi&f=1"
                                        }
                                        newsUrl={article.url}
                                        author={article.author}
                                        date={article.publishedAt}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}
