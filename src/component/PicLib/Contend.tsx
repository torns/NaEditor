import * as React from 'react';
import { Row, Col, Button, Upload, Input } from 'antd';
const Search = Input.Search;

import INTERFACE from '../../common/script/INTERFACE';

export interface ContentProps {
    defaultValue?: string;
    selectedImgChange?: React.MouseEventHandler<HTMLAnchorElement>;
}

const uploadProps = {
    name: 'file',
    action: INTERFACE.uploadImage,
    headers: {
        authorization: 'authorization-text',
    },
};

class Content extends React.Component<ContentProps, any> {

    constructor(props: ContentProps) {
        super(props);
    }

    render() {
        const { imgList } = this.state;

        const ImgList = () => (
            <div>das</div>
        );

        return (
            <div className="d-content">
                <Row>
                    <Col span={4}>
                        <Search
                            placeholder="输入图片名称或关键字"
                        />
                    </Col >
                    <Col span={2} offset={18}>
                        <Upload {...uploadProps}>
                            <Button className="d-upload-img" type="primary">
                                上传图片
                            </Button>
                        </Upload>
                    </Col >
                </Row>
                <Row>
                    {ImgList()}
                </Row>
            </div>
        );
    }
}

export default Content;
