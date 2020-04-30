import React from 'react';
import youtube from "../../api/youtube";
import VideoList from "./VideoList";
import SearchBar from './SearchBar';
import VideoDetail from './VideoDetail';


class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: undefined,
        error: null
    }
    componentDidMount() {
        this.onFormSubmit("cat");
    }
    onVideoSelect = video => {
        this.setState({selectedVideo: video})
    }
    onFormSubmit = async term => {
        try {
            const response = await youtube.get('/search', {
                params: {
                    q: term
                },

            });
            this.setState({videos: response.data.items, selectedVideo: response.data.items[0]});
        } catch (err) {
            this.setState({error: err.message});
        }
    }
    render() {
        return (
            <div className="ui container" style={{marginTop: '10px'}}>
                {this.state.error && <h2>{this.state.error}</h2>}
                <SearchBar myOnSubmit={this.onFormSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail selectedVideo={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }
};

export default App;