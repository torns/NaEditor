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
            <div className={`J_module ${isFocus === true ? 'focus' : ''}`}
                onClick={() => { this.focus() }}
                data-module-name={this.props.moduleName}
                data-module-id={this.props.moduleId}>
                {this.props.children}
            </div>
        )
    }

}