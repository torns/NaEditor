import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Actions from '@actions';

import './ModuleList.scss';



class ModuleList extends Component {
    constructor() {
        super();
        this.addModule = this.addModule.bind(this);
        this.state = {
            list: [
                {
                    cataName: '图文类',
                    cateId: 1,
                    isActive: true,
                    list: [
                        {
                            name: '图片热区',
                            typeId: 2,
                            iconUrl: ''
                        }
                    ]
                }, {
                    cataName: '自定义类',
                    cateId: 2,
                    isActive: false,
                    list: [
                        {
                            name: '自定义代码',
                            typeId: 1,
                            iconUrl: '',
                        }
                    ]
                }
            ]
        }
    }

    addModule(moduleTypeId) {
        const { store } = this.context;
        const args = {
            moduleTypeId,
            pageId: window.BASE_DATA.pageId,
        }
        store.dispatch(Actions.addModuleRequest(args))
    }


    render() {

        const { list } = this.state;

        return (
            <div className="d-module-list" >
                {list.map((moduleCate, i) =>
                    <React.Fragment key={i}>
                        <div className="d-module-cate">
                            <span className="d-cate-name">{moduleCate.cataName}</span>
                        </div>
                        <div className="d-sub-list">
                            {moduleCate.list.map(module =>
                                <div key={module.typeId}
                                    className="d-module-item"
                                    data-type-id={module.typeId}
                                    draggable="true"
                                    onDoubleClick={(e) => { this.addModule(module.typeId) }}
                                >
                                    <div className="d-module-icon" style={{ backgroundImage: module.iconUrl }} />
                                    <span className="d-module-name">{module.name}</span>
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                )}
            </div>
        )
    }


}

ModuleList.contextTypes = { store: PropTypes.object };


export default ModuleList;