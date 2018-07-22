import React from 'react';
import { connect } from 'react-redux';

import ModuleTag from '@component/ModuleTag';

class ModuleTagList extends React.Component {

    constructor(props) {
        super();

    }



    render() {
        const { moduleList } = this.props.module;
        return (
            <div className={`d-module-tag-list`}>
                {moduleList.map(v => <ModuleTag key={v.moduleId} moduleData={v} />)}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return { module: state.module }
}

export default connect(mapStateToProps, {
})(ModuleTagList)
