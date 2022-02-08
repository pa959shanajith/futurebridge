import React,{Component} from 'react'
import './App.css'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      user:'xxx',
      movies:[]
    }
  }
  componentDidMount(){
    this.getAllMovies();
  }

  getAllMovies = () => {
    fetch(`http://localhost:8080/movies/getallmovies/${this.state.user}`)
    .then( response => response.json())
    .then((data) => {
      this.setState({movies:data.data})
    }).catch((err) => {
      console.log(err);
    })
  }

  BookTicket = (tid) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId: tid,user:this.state.user })
  };
    fetch(`http://localhost:8080/movies/bookmovie`,requestOptions).then( response => response.json())
    .then((data) => {
      if(data.status){
        alert('Movie booked ',data.data.moviename);
        this.getAllMovies();
      }
      else{
        alert('Failed to book movie ',data.data.moviename)
      }
    }).catch((err) => {
      console.log(err);
      alert('failed to book movie please try another movie')
    })
  }

  render(){
    const {movies} = this.state
    return(<>
    <div className="container">

        <div className="card-deck row">
          {
            movies.map((mo) =>(
              <div key={mo.id} className='column'>
              <div className="col-xs-12 col-sm-6 col-md-4">
              <div className="card">
                <div className="view overlay">
                    <div className="mask rgba-white-slight"></div>
                </div>

                <div className="card-body">
                  <h4 className="card-title">title : {mo.moviename}</h4>
                  <h4 className="card-title">rating : {mo.rating}</h4>
                  <h4 className="card-title">release date : {mo.released_date} </h4>
                  <button onClick={() => this.BookTicket(mo.id)}  type="button" className="btn btn-success">Book Now</button>

                </div>

              </div>
              </div>
        </div>
    ))
  }
</div>
</div>
    </>)
  }
  
}

export default App;