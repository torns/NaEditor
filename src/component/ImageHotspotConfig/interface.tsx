import { IModuleData, IModuleConfig } from '../interface';

export interface ImgaeInfo {
    name?: string;
    url: string;
}

export interface ImageHotspotConfData {
    imgs: ImgaeInfo[] | undefined;
}

// 配置组件props
export interface ImageHotspotConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

// 配置组件state
export interface ImageHotspotConfigState {
    imgs: ImgaeInfo[] | undefined;
}
