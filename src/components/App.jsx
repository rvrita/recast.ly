import VideoList from './VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';
import VideoPlayer from './VideoPlayer.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchYouTube = _.debounce(this.props.searchYouTube, 500, {leading: true});
    this.state = {
      video: exampleVideoData[0],
      videos: [],
      inputValue: ''
    };
  }

  handleClick(video) {
    this.setState({
      video: video
    });
  }

  updateInputValue(event) {
    this.state.inputValue = event.target.value;
    this.searchYouTube(
      {
        query: this.state.inputValue,
        max: 5,
        key: YOUTUBE_API_KEY
      }, (data) => { this.setState({ videos: data }); }
    );
  }

  handleSubmit() {
    this.searchYouTube(
      {
        query: this.state.inputValue,
        max: 5,
        key: YOUTUBE_API_KEY
      }, (data) => { this.setState({ videos: data }); }
    );
  }

  componentDidMount() {
    this.props.searchYouTube(
      {
        query: '',
        max: 5,
        key: YOUTUBE_API_KEY
      }, (data) => { this.setState({ videos: data }); }
    );
  }

  render () {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search updateInputValue={this.updateInputValue.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.video}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} handleClick={this.handleClick.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
