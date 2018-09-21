import React from 'react';
import PropTypes from 'prop-types';

import { IBASE_DATA } from '../interface';

interface IContextProviderProps {
    BASE_DATA: IBASE_DATA;
}

class ContextProvider extends React.Component<IContextProviderProps, any> {

    static childContextTypes = {
        BASE_DATA: PropTypes.object,
    };

    BASE_DATA: IBASE_DATA;

    constructor(props: IContextProviderProps) {
        super(props);
        this.BASE_DATA = props.BASE_DATA;
    }

    getChildContext() {
        return {
            BASE_DATA: this.BASE_DATA,
        };
    }

    render() {
        return this.props.children;
    }
}

export default ContextProvider;