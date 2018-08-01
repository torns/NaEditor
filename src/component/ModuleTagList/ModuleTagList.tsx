import React from 'react';
import { connect } from 'react-redux';

import ModuleTag from '../ModuleTag';
import { IModule, IState } from '../interface';

interface ModuleTagListProps {
    module: IModule;

}

interface ModuleTagListState {

}

class ModuleTagList extends React.Component<ModuleTagListProps, ModuleTagListState> {

    constructor(props: ModuleTagListProps) {
        super(props);

    }

    render() {
        const { moduleList } = this.props.module;
        return (
            <div className={`d-module-tag-list`}>
                {moduleList.map(v => <ModuleTag key={v.moduleId} moduleData={v} />)}
            </div>
        );
    }

}

const mapStateToProps = (state: IState) => {
    return { module: state.module };
};

export default connect(mapStateToProps, {
})(ModuleTagList);
