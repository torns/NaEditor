import { IModuleData, IModuleConfig, HotspotInfo } from '../interface';

export interface ImageInfo {
    name?: string;
    url: string;
}

export interface ImageHotspotConfData {
    imgs?: ImageInfo[];
    hotspots?: HotspotInfo[];
}

// 配置组件props
export interface ImageHotspotConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

// 配置组件state
export interface ImageHotspotConfigState {
    imgs?: ImageInfo[];
    hotspots?: HotspotInfo[];
}
