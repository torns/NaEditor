import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';

import { showConfig, focusModule, removeModuleRequest } from '@actions';

const mapStateToProps = ({ module, moduleConfig }) => {
	return {
		module,
		moduleConfig,
	};
};

@connect(mapStateToProps, {
	showConfig,
	focusModule,
	removeModuleRequest,
})
class ModuleNavItem extends Component {
	constructor() {
		super();
	}

	render() {

		const {
			moduleData,
			moduleConfig: {
				isVisiable: isConfigVisiable,
			},
			moduleData: {
				moduleName,
				moduleId,
				tempData: {
					isActive,
				}
			}, showConfig, focusModule, removeModuleRequest
		} = this.props;

		const pageId = Number.parseInt(window.BASE_DATA.pageId);

		return (
			<li className={`d-module-nav-item ${isActive ? 'active' : ''}`}
				onClick={(e) => { focusModule(moduleId); isConfigVisiable && showConfig(moduleData); }}>
				<span className="d-module-name">{moduleName}</span>
				<span className="d-module-operate">
					<Icon className="d-operate-icon"
						type="setting"
						onClick={(e) => { showConfig(moduleData); }}
					/>
					<Icon className="d-operate-icon"
						type="delete"
						onClick={(e) => {
							removeModuleRequest({
								moduleId,
								pageId,
							});
						}}
					/>
				</span>
			</li>
		)

	}

}




class ModuleNavList extends Component {

	static defaultProps = {

	}


	constructor() {
		super();

	}


	render() {

		const { onClose, module: { moduleList } } = this.props;

		return (
			<div className='d-module-nav-list'>
				<div className="d-header">
					<p className="d-title">模块导航</p>
					<Icon className="d-close-icon" type="close" onClick={onClose} />
				</div>
				<ul>
					{moduleList.map(v => <ModuleNavItem key={v.moduleId} moduleData={v} />)}
				</ul>
			</div>
		)
	}
}





export default connect(mapStateToProps, {
	showConfig,
	focusModule,
	removeModuleRequest,
})(ModuleNavList);