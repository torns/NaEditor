import React from 'react';
import Slider from 'react-slick';

import Module from '../Module';
import { IModuleData, ImageInfo } from '../interface';

interface CarouselProps {
    moduleData: IModuleData;
}

interface CarouselState {

}

export default class Carousel extends React.Component<CarouselProps, CarouselState> {
    constructor(props: CarouselProps) {
        super(props);
    }

    renderSlider = (imgs: ImageInfo[]) => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 800,
        };
        return (
            <Slider {...settings}>
                {imgs.map((v, i) => (<div key={i}><img src={v.url} /></div>))}
            </Slider>
        );

    }

    render() {
        let {
            moduleData,
            moduleData: {
                data: {
                    imgs,
                },
            },
        } = this.props;
        if (imgs === undefined) {
            imgs = [];
        }
        return (
            <Module moduleData={moduleData}>
                {this.renderSlider(imgs)}
            </Module >
        );
    }
}