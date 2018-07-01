import React from 'react';
import $ from 'jquery';

import Module from '@component/Module';


export default class ImageHotspot extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const { imgSrc } = this.props.moduleData.data;
        this.setState({
            imgSrc,
        })
    }

    componentWillUnmount() {
        console.log('remove', this)
    }

    /**
     * 
     */
    render() {
        return (
            <Module>
                <img src={this.state.imgSrc} />
            </Module>

        )
    }


}