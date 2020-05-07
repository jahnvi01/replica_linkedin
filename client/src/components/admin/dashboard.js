import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import {isAuth,adminAuth} from '../../functions/auth';

class Dashboard extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
    users:[]
  
  };
  componentWillMount(){
    adminAuth(this.props); 
    //  var company=isAuth().company 
    fetch('/api/admin/users',{
        method: "get",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
      .then(res=>res.json())
      .then(res=>this.setState({users:[res]}))
  }


  showUsers=()=>{
    if(this.state.users){
       
  var users=this.state.users.map(user=>{
    return(
      <div className="row job-details" key={user._id}>
   <div className="col-md-2">
   <i className='fas fa-house-user' style={{fontSize:'36px',color:"gray",background:"lightgray",padding:"5%"}}></i>
   </div>
   <div className="col-md-4 post-font" style={{color:"black"}}>
    <h4>{user.fullname}</h4>
    <div style={{display:"flex"}}>
    <i className='far fa-address-card p-1' style={{fontSize:'18px',color:"gray"}}></i>
    <h5 className="post-font p-1" style={{fontSize:"18px"}}>{user.email}</h5>
    
    </div>
  
   </div>
   <div className="col-md-3 post-font" style={{display:"flex"}}>
   <i className='fas fa-phone p-1' style={{fontSize:'20px',color:"gray"}}></i>
    <h5>{user.contact}</h5>
    </div>
   <div className="col-md-3 post-font">
     <Link to={`/admin/users/${user._id}`}>
   <button type="button" className="btn btn-outline-primary">Update</button>
  </Link>
     </div>
    </div>
    )
  
  })
  return users;
    }
    else{
      return(
        <h3>No Users To Show</h3>
      )
    }
  }
  
  render() {
      console.log(this.state.users)
      return (
        <div>
<div className="row unit-5 background text-center" >
      
      <div className="col-md-6 offset-3" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Admin Dashboard </h2>
        </div>
          </div>
          <div className="container">
  
  {this.showUsers()}

   </div>
        </div>
    
      );
    }
  }
  


  
  export default withRouter(Dashboard);