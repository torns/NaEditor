import { ImageInfo, IModuleData, IModuleConfig } from '../interface';

export interface CarouselConfData {
    imgs: ImageInfo[] | undefined;
}

// 配置组件props
export interface CarouselConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

// 配置组件state
export interface CarouselConfigState {
    imgs: ImageInfo[] | undefined;
}
