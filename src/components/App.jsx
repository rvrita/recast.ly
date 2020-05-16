import VideoList from './VideoList.js';
import exampleVideoData from '../data/exampleVideoData.js';
import VideoPlayer from './VideoPlayer.js';
// import searchYouTube from '../lib/searchYouTube.js';
import Search from './Search.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
// searchYouTube(null, (data) => {
//   console.log(data)
// })

class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchYouTube = _.debounce(this.props.searchYouTube, 500);
    this.searchYouTube({
      query: '',
      max: 5,
      key: YOUTUBE_API_KEY
    }, (data) => { this.setState({ videos: data }); });
    this.state = {
      video: exampleVideoData[0],
      videos: exampleVideoData,
      inputValue: ''
    };
  }

  handleClick(video) {
    console.log(video);
    this.setState({
      video: video
    });
  }

  updateInputValue(event) {
    this.state.inputValue = event.target.value;
    console.log(this.state.inputValue);
  }

  handleSubmit() {
    console.log('hello');
    this.searchYouTube(
      {
        query: this.state.inputValue,
        max: 5,
        key: YOUTUBE_API_KEY
      }, (data) => { this.setState({ videos: data }); }
    );
  }

  componentDidMount() {
    searchYouTube(
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

// var App = () => (
//   <div>
//     <nav className="navbar">
//       <div className="col-md-6 offset-md-3">
//         <div><h5><em>search</em> view goes here</h5></div>
//       </div>
//     </nav>
//     <div className="row">
//       <div className="col-md-7">
//         <VideoPlayer video={exampleVideoData[0]}/>
//       </div>
//       <div className="col-md-5">
//         <VideoList videos={exampleVideoData}/>
//       </div>
//     </div>
//   </div>
// );

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
