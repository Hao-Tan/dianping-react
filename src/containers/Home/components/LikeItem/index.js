import React, { Component } from 'react'
import { Link } from "react-router-dom"
import './style.css'

export default class LikeItem extends Component {
  render() {
    const {
      id,
      shop,
      tag,
      picture,
      product,
      currentPrice,
      oldPrice,
      saleDesc
    } = this.props.data

    return (
      <li>
        <Link to={`/detail/${id}`} href="##" className="likeItem">
          <div className="likeItem__picContainer">
            <div className="likeItem__picTag">{tag}</div>
            <img src={picture} alt={shop} className="likeItem__pic"/>
          </div>

          <div className="likeItem__content">
            <h2 className="likeItem__shop">{shop}</h2>
            <p className="likeItem__product">{product}</p>
            <div className="likeItem__detail">
              <div className="likeItem__price">
                <ins className="likeItem__currentPrice">{currentPrice}</ins>
                <del className="likeItem__oldPrice">{oldPrice}</del>
              </div>
              <div className="likeItem__sale">{saleDesc}</div>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}
