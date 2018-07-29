import { IModuleData, IModuleConfig } from '../interface';

export interface ImageInfo {
    name?: string;
    url: string;
}

export interface ImageHotspotConfData {
    imgs: ImageInfo[] | undefined;
}

// 配置组件props
export interface ImageHotspotConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

// 配置组件state
export interface ImageHotspotConfigState {
    imgs: ImageInfo[] | undefined;
}
