
import React from 'react';
import logo from './logo_1.svg';
import axios from 'axios';

const domain = "https://tocato.co";


class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            password: '',
            node: null,
            loading: false
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
        this.setState({loading:true})
        const params = {
            url: this.state.url,
            password: this.state.password
          };
          let axiosInstance = axios.create({
            baseURL: 'https://glacial-garden-78561.herokuapp.com/https://tocato.herokuapp.com/'
          });
      
          axiosInstance.post(`/webhook/new`, params)
            .then(res => {
                if(res){
                    this.setState({node: res.data[0].node})
                }
            })
        e.preventDefault();
     }
    
    render() {
      return(
      <div className="container h-100">
        <div className="row align-items-center h-100">
            {!this.state.node ?
            <form className="form-signin text-center">
                <img className="mb-5" src={logo} alt="tocato" width="140"/>
                <h1 className="h4 mb-3 fw-normal" width="800">Create password-protected URL</h1>

                <div className="form-floating">
                <input type="url" className="form-control" id="floatingInput" name="url" placeholder="my-private-link.com"
                    onChange={this.handleChange} required/>
                <label htmlFor="floatingInput">Enter the URL</label>
                </div>
                <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" 
                onChange={this.handleChange} required/>
                <label htmlFor="floatingPassword">Create a password</label>
                </div>
                { this.state.loading ?
                    <button class="w-100 btn btn-lg btn-primary" type="button" disabled>
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span class="visually-hidden">Loading...</span>
                    </button>
                    :
                    <button onClick={this.handleSubmit} className="w-100 btn btn-lg btn-primary" type="submit"  { ...( (!this.state.url || !this.state.password) && { disabled: true } ) }>Get password-protected link</button>    
                }
                <p className="mt-5 mb-3 text-muted"><a href="https://twitter.com/giardiv">@giardiv</a> - <a href="https://tally.so/r/mKzoKn" target="_blank" rel="noreferrer" >Send a feedback</a></p>
            </form> :
            <div className="row align-items-center">
                <div className="col-4 mx-auto">
                    <div className="text-center"><img className="mb-4" src={logo} alt="tocato logo" width="72"/>
                    </div>
                    <b className="mb-2 text-center">Private url</b>
                    <div className="bg-light border rounded-3 p-3 mt-2">
                        <a href={domain + "/" + this.state.node}>{domain + "/" + this.state.node}</a>
                    </div>
                </div>
            </div>
            }
        </div>
      </div>);
    }
}


export default Homepage;
