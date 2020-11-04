import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import "./App.css";
import Images from "./components/Images";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import Navigation from "./components/Navigation";
import About from "./static/About";
import UnknownURL from "./static/UnknownURL";
import axios from "axios";

class App extends Component {
  state = {
    images: [],
    loading: false,
    currentPage: 1,
    imagesPerPage: 5,
    searchKey: "nature",
    showModal: false,
    selectedImage: null,
  };

  async componentDidMount() {
    const { searchKey } = this.state;
    this.setState({ searchKey: searchKey });
    this.getSearchedImages(searchKey);
  }

  getSearchedImages = async (searchKey, page = 1) => {
    this.setState({ loading: true });

    let clientId;

    if (process.env.NODE_ENV !== "production") {
      clientId = process.env.REACT_APP_UNSPLASH_CLIENT_ID;
      console.log(clientId);
    } else {
      clientId = process.env.UNSPLASH_CLIENT_ID;
    }

    let res = await axios.get("https://api.unsplash.com/search/photos", {
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      params: { query: searchKey, page: page, per_page: 20 },
    });

    this.setImages(res.data, page);
  };

  setImages = (result, page) => {
    const { results } = result;
    const { searchKey, images } = this.state;

    const previousSavedSearch =
      images && images[searchKey] ? images[searchKey].results : [];

    const updatedSearch = [...previousSavedSearch, ...results];

    this.setState({
      images: {
        ...images,
        [searchKey]: { results: updatedSearch, page },
      },
      loading: false,
    });
  };

  needsToSearchImgs(searchKey) {
    return !this.state.images[searchKey];
  }

  onSearchSubmit = (searchKey) => {
    this.setState({ searchKey: searchKey });

    if (this.needsToSearchImgs(searchKey)) {
      this.getSearchedImages(searchKey);
    }
  };

  paginate = (pageNumber) => {
    const { images, searchKey, imagesPerPage } = this.state;
    this.setState({ currentPage: pageNumber });
    if (pageNumber === images[searchKey].results.length / imagesPerPage) {
      this.getSearchedImages(searchKey, images[searchKey].page + 1);
    }
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  onImageSelect = (image) => {
    this.setState({ selectedImage: image });
    this.toggleModal();
  };

  getCurrentImages() {
    const { currentPage, imagesPerPage, images, searchKey } = this.state;

    const indexOfLastPost = currentPage * imagesPerPage;
    const indexOfFirstPost = indexOfLastPost - imagesPerPage;

    if (images[searchKey]) {
      const { results } = images[searchKey];

      return {
        currentImages: results.slice(indexOfFirstPost, indexOfLastPost),
        totalImages: results.length,
      };
    } else {
      return { currentImages: [], totalImages: 0 };
    }
  }

  render() {
    const {
      currentPage,
      imagesPerPage,
      loading,
      images,
      searchKey,
      showModal,
    } = this.state;

    let currentImgConfig = this.getCurrentImages();

    return (
      <Router>
        <Navigation />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <div>
                <SearchBar onSubmit={this.onSearchSubmit} />
                <Images
                  images={currentImgConfig.currentImages}
                  loading={loading}
                  onImageSelect={this.onImageSelect}
                />
                <Pagination
                  imagesPerPage={imagesPerPage}
                  totalImages={currentImgConfig.totalImages}
                  paginate={this.paginate}
                />
              </div>
            )}
          />
          <Route exact path="/about" component={About} />
          <Route component={UnknownURL} />
        </Switch>

        <div style={{ marginTop: "10px" }}>
          {showModal ? (
            <Modal>
              <div className="innerModal">
                <img
                  src={this.state.selectedImage.urls.regular}
                  alt=""
                  style={{ width: "100%" }}
                />
                <div className="buttons">
                  img here
                  <button onClick={this.toggleModal}>Close</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </Router>
    );
  }
}

export default App;
