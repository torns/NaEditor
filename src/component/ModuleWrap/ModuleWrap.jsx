import React from 'react';



export default class ModuleWrap extends React.Component {

    constructor(props) {
        super();
    }

    componentWillMount() {

    }

    focus() {
        this.props.onFocus();
    }


    render() {
        const { isFocus } = this.props;
        return (
            <div className={`J_moduleWrap ${isFocus === true ? 'focus' : ''}`}
                onClick={() => { this.focus() }}>
                {this.props.children}
            </div>
        )
    }

}