import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    return (
      <>
        <div className={`preloader ${props.loading ? 'preloader_active':''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
        <p className={`nothing ${props.nothing ? 'nothing_active':''}`}>Ничего не найдено</p>
        </>
    )
};

export default Preloader
