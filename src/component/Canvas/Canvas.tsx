import React from 'react';
import { connect } from 'react-redux';

import { IModuleData, IState } from '../interface';
import UserDefine from '../UserDefine';
import ImageHotspot from '../ImageHotspot';
import Text from '../Text';
import { fetchModuleList, focusModule } from '../../actions';
import Carousel from '../Carousel';
import Layer from '../Layer';
import Fixed from '../Fixed';

interface CanvasProps {
    fetchModuleList: (pageId: number) => void;
    moduleList: IModuleData[];
}

class Canvas extends React.Component<CanvasProps, {}> {
    constructor(props: CanvasProps) {
        super(props);
    }

    BASE_DATA: any;

    componentWillMount() {
        this.BASE_DATA = (window.top as any).BASE_DATA;
        // if ((window as any).BASE_DATA.type !== '1') {   // 非预览页
        //     BASE_DATA = (window as any).top.BASE_DATA;
        // } else {
        //     BASE_DATA = (window as any).BASE_DATA;
        // }

        // 初始化模块
        this.props.fetchModuleList(this.BASE_DATA.pageId);
    }

    componentDidMount() {
        if (this.BASE_DATA.type === '0') { // type为0为装修
            setTimeout(() => {
                (window as any).resizeIframe();
            }, 1000);
        }
    }

    /**
     * 画布更新
     */
    componentDidUpdate() {
        if (this.BASE_DATA.type === '0') { // type为0为装修
            (window as any).resizeIframe();
        }
    }

    render() {

        const moduleList: IModuleData[] = this.props.moduleList;
        if (!moduleList) {
            return null;
        }

        function getModuleList(moduleList: IModuleData[]) {

            if (!moduleList) {
                return <div />;
            }

            return moduleList.map((v, i) => {
                const { moduleTypeId } = v;
                switch (moduleTypeId) {
                    case 1:
                        return <UserDefine key={v.moduleId} moduleData={v} />;
                    case 2:
                        return <ImageHotspot key={v.moduleId} moduleData={v} />;
                    case 3:
                        return <Text key={v.moduleId} moduleData={v} />;
                    case 4:
                        return <Carousel key={v.moduleId} moduleData={v} />;
                    case 5:
                        return <Layer key={v.moduleId} moduleData={v} />;
                    case 6:
                        return <Fixed key={v.moduleId} moduleData={v} />;
                    default:
                        return null;
                }
            });
        }

        return (
            <React.Fragment>
                {this.BASE_DATA.type === '0' && <div className="d-header"></div>}
                {getModuleList(moduleList)}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return { moduleList: state.module.moduleList };
};

export default connect(mapStateToProps, { fetchModuleList, focusModule })(Canvas);
