import { ImageHotspotConfData } from './ImageHotspotConfig/interface';
import { CarouselConfData } from './CarouselConfig/interface';

export interface ImageInfo {
    url: string;
    name?: string;
}

export interface AreaInfo {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
}

// 热区定义
export interface HotspotInfo {
    url: string;
    area?: AreaInfo;
}

// tempData定义
export interface ITempData {
    isActive: boolean;
    top: number;
    height: number;
}

// moduleData接口定义
export interface IModuleData {
    moduleTypeId: number;
    moduleName: number;
    pageId: number;
    moduleId: number;
    data: any;
    configData: ImageHotspotConfData | CarouselConfData;
    tempData: ITempData;
}

// moduleConfig接口定义
export interface IModuleConfig {
    isVisible: boolean;
    moduleData: IModuleData;
}

// state中module定义
export interface IModule {
    moduleList: IModuleData[];
}

// state定义
export interface IState {
    module: IModule;
    moduleConfig: IModuleConfig;
}