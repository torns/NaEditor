import React from 'react';
import Slider from "react-slick";

import Module from '@component/Module';



export default class Carousel extends React.Component {
    constructor() {
        super();
    }


    /**
     * 
     */
    render() {
        const { moduleData } = this.props;
        let { imageList } = moduleData.data;
        imageList = imageList || ['', ''];
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 800,
        };
        return (
            <Module moduleData={moduleData}>
                <Slider {...settings}>
                    {imageList.map((v, i) => (
                        <div key={i}>
                            <img src={v} />
                        </div>
                    ))}
                </Slider>
            </ Module>

        )
    }


}