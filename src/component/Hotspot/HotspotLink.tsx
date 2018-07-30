import React, { ChangeEvent } from 'react';
import { Icon, Input, Button } from 'antd';
const InputGroup = Input.Group;

interface HotspotLinkProps {
    value: string;
    onChange: (value: string) => void;
    onRemove: () => void;
    onUp: () => void;
    onDown: () => void;
}

interface HotspotLinkState {

}

class HotspotLink extends React.Component<HotspotLinkProps, HotspotLinkState> {
    constructor(props: HotspotLinkProps) {
        super(props);

    }

    handleChange = (value: string) => {
        this.props.onChange(value);
    }

    render() {
        const {
            value,
            onChange,
            onRemove,
            onUp,
            onDown,
        } = this.props;
        return (
            <InputGroup
                compact
                className="d-hotspot-link"
            >
                <div
                    style={{ width: '10%' }}
                    className="d-item d-position"
                >
                    <Icon className="d-icon-up" type="caret-up" onClick={onUp} />
                    <Icon className="d-icon-down" type="caret-down" onClick={onDown} />
                </div>
                <Input
                    className="d-item"
                    placeholder="输入热区的链接地址"
                    value={value}
                    onChange={(e: ChangeEvent) => { this.handleChange(e.target.nodeValue || ''); }}
                    style={{ width: '80%', fontSize: '13px' }}
                />
                <Button
                    className="d-item d-delete"
                    style={{ width: '10%' }}
                    onClick={onRemove}
                >
                    <Icon type="delete" />
                </Button>
            </InputGroup >
        );
    }
}

export default HotspotLink;