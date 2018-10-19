import { IModuleData, IModuleConfig } from './../interface';

export interface GoodsConfData {
    skuids: string;
    templateId: number;
}

export interface GoodsConfigProps {
    moduleData: IModuleData;
    moduleConfig: IModuleConfig;
}

export interface GoodsConfigState {
    skuids: string;
    templateId: number;
}
