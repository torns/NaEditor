import React from 'react';
import { connect } from 'react-redux';

import { IModuleData, IState } from '../../component/interface';
import UserDefine from '../UserDefine';
import ImageHotspot from '../ImageHotspot';
import Text from '../Text';
import { fetchModuleList, focusModule } from '../../actions';
import Carousel from '../Carousel';

let BASE_DATA: any;
if ((window as any).BASE_DATA.type !== '1') {   // 非预览页
    BASE_DATA = (window as any).top.BASE_DATA;
} else {
    BASE_DATA = (window as any).BASE_DATA;
}

interface CanvasProps {
    fetchModuleList: (pageId: number) => void;
    moduleList: IModuleData[];
}

class Canvas extends React.Component<CanvasProps, {}> {
    constructor(props: CanvasProps) {
        super(props);
    }

    componentWillMount() {
        // 初始化模块
        this.props.fetchModuleList(BASE_DATA.pageId);
    }

    componentDidMount() {
        if (Number.parseInt(BASE_DATA.type, 10) === 0) { // type为0为装修
            setTimeout(() => {
                (window as any).resizeIframe();
            }, 1000);
        }
    }

    /**
     * 画布更新
     */
    componentDidUpdate() {
        if (Number.parseInt(BASE_DATA.type, 10) === 0) { // type为0为装修
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
                    default:
                        return null;
                }
            });
        }

        return (
            <React.Fragment>
                {getModuleList(moduleList)}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return { moduleList: state.module.moduleList };
};

export default connect(mapStateToProps, { fetchModuleList, focusModule })(Canvas);
