import React from 'react';

import Module from '@component/Module';


export default class ImageHotspot extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        const { imageUrl } = this.props.moduleData.data;
        this.setState({
            imageUrl,
        })
    }

    componentWillReceiveProps(nextProps) {
        const { imageUrl } = nextProps.moduleData.data;
        this.setState({
            imageUrl,
        })
    }

    /**
     * 
     */
    render() {
        return (
            <Module moduleData={this.props.moduleData}>
                <img src={this.state.imageUrl} />
            </ Module>

        )
    }


}