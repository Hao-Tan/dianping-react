import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function BuyButton(props) {
  const {productId} = props
  return (
    <Link className="buyButton" to={`/purchase/${productId}`}>
      立即购买
    </Link>
  )
}

