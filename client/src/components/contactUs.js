import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ShowAlert from '../functions/alert';
import Footer from './footer';
class ContactUs extends Component {
  state = {
    visible: false,
    message:"",
    error:"",
    loading:false,
 
  
  };
  handleSubmit=()=>{
var name=document.getElementById("fullname").value;
var email=document.getElementById("email").value;
var message=document.getElementById("message").value;
if(name && email && message){
    const post={
        name,email,message
    }
    fetch('/api/admin/contact',{
        method: "post",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },body:JSON.stringify(post)
      })
      .then(res=>res.json())
      .then(res=>{
        this.setState({message:res.message||"",error:res.error||""});
      })      
}
else{
    this.setState({error:"Fill up all the fields"})
}
  }
  removeAlert=()=>{
    if(this.state.message || this.state.error) {
      setTimeout(()=>{ this.setState({error:"",message:""}) }, 3000);
    }
   }
    render() {
    this.removeAlert()
     
      return (
        <div>
<div className="row unit-5 background text-center" >
    {(this.state.message || this.state.error) && (<ShowAlert error={this.state.error} message={this.state.message}/>)       
    }

     
      <div className="col-md-6 offset-3"  id="backgroundText" style={{alignSelf:"center"}}>
            <h2 style={{color:"white",fontSize:"40px",fontWeight:"bold"}}>Request Callback</h2>
        </div>
          </div>
        
          <div className="row m-3" >
      
      <div className="col-md-8 post-card">
      <div className="row profile-card">
<div className="col-md-12" style={{alignItems:"center"}} >
<p className="m-3 font-title">Full-Name:</p> 
<input type="text" className="input-form" id="fullname" />
</div>
<div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-3 font-title">Email:*</p> 
<input type="email" className="input-form" id="email"  />
</div>

<div className="col-md-12" style={{alignItems:"center"}}>
<p className="m-3 font-title">Message:</p> 
<textarea type="text"  id="message" rows="5" className="form-control"/>
</div>

<button type="submit" onClick={()=>this.handleSubmit()} className="btn btn-success m-3">Message</button>  
<ShowAlert error={this.state.error} message={this.state.message}/>
</div>


        </div>
        <div className="col-md-4">
        <div className="post-card">
<div style={{alignItems:"center"}} >

<p className="m-2 font-title">Contact Info:</p> 
</div>
<div  style={{alignItems:"center"}}>
      <p className="m-1 font-title">Address:</p> 
      <p>Sec-3, Dwarka, New Delhi- 110078
</p>
</div>

<div  style={{alignItems:"center"}}>
      <p className="m-1 font-title">Phone:</p> 
      <p>+91 8329606547</p>
</div>
<div  style={{alignItems:"center"}}>
      <p className="m-1 font-title">Email Address:</p> 
      <p>mail@TechHire.in</p>
</div>
</div>

</div>


</div>
<Footer />
        </div>
    
      );
    }
  }
  


  
  export default withRouter(ContactUs);