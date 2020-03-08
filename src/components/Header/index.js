import React from 'react'
import './style.css'

export default function Header(props) {
  const { grey, title, onBack } = props;
  
  const backgroundColor = grey ? '#f0f0f0' : '#fff'
  return (
    <header className="header" style={{'backgroundColor': backgroundColor}} onClick={onBack}>
      <div className="header__back">
        返回
      </div>
      <div className="header__title">
        {title}
      </div>
    </header>
  )
}
