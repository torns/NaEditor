import React from 'react';
import $ from 'jquery';
import Module from '@component/Module';


export default class extends Module {
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
            <div className="J_module">
                <img src={this.state.imgSrc} />
            </div>

        )
    }


}