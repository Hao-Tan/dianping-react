import React, { Component } from 'react'


export default class User extends Component {
  render() {
    return (
      <div>
        {
          [1,2,3,4,5].map((item,index) => (
            <div key={index} onClick={(e)=> {console.log(e,this,item)}}> {item} </div>
          ))
        }
      </div>
    )
  }

  handleClick = (e) => {
    console.log(e)
  }
}
