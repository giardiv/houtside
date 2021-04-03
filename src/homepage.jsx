
import React from 'react';
import logo from './scene.png';
import axios from 'axios';



class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            password: '',
            node: 'abc'
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
     }
     handleSubmit(e) {
        console.log(this.state.url);
        console.log(this.state.password);
        const params = {
            url: this.state.url,
            password: this.state.password
          };
      
          axios.post(`https://houtside.app.n8n.cloud/webhook/new`, { params },{
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
          }        )
            .then(res => {
                if(res){
                    this.setState({node: res[0].result})
                }
              console.log(res);
              console.log(res.data);
            })
        e.preventDefault();
     }
    
    render() {
      return(
      <div className="container h-100">
        <div className="row align-items-center h-100">
            {this.state.node ?
            <form className="form-signin text-center">
                <img className="mb-4" src={logo} alt="houtsi.de logo" width="72"/>
                <h1 className="h3 mb-3 fw-normal">Add password to you url</h1>

                <div className="form-floating">
                <input type="url" className="form-control" id="floatingInput" name="url" placeholder="my-private-link.com"
                    onChange={this.handleChange} required/>
                <label htmlFor="floatingInput">Enter your private url</label>
                </div>
                <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" 
                onChange={this.handleChange} required/>
                <label htmlFor="floatingPassword">Define a password</label>
                </div>
                <button onClick={this.handleSubmit} className="w-100 btn btn-lg btn-primary" type="submit">Get a private link</button>
                <p className="mt-5 mb-3 text-muted">© 2017–2021 - <a href="https://tally.so/r/mKzoKn" target="_blank" rel="noreferrer" >Send a feedback</a></p>
            </form> :
            <div className="row align-items-center">
                <div className="col-4 mx-auto">
                    <div className="text-center"><img className="mb-4" src={logo} alt="houtsi.de logo" width="72"/>
                    </div>
                    <b className="mb-2 text-center">Private url</b>
                    <div className="bg-light border rounded-3 p-3 mt-2">
                        <a href={this.state.node}>{this.state.node}</a>
                    </div>
                </div>
            </div>
            }
        </div>
      </div>);
    }
}


export default Homepage;
