import DxfArrayScanner, { IGroup } from '../DxfArrayScanner';
import IGeometry, { IEntity, IPoint } from './geomtry';
export interface IImageEntity extends IEntity {
    position: IPoint;
    uVector: IPoint;
    vVector: IPoint;
    imgWidth: number;
    imgHeight: number;
    clipBoundary: IPoint[];
    isClipped: boolean;
}
export default class Line implements IGeometry {
    ForEntityName: "IMAGE";
    parseEntity(scanner: DxfArrayScanner, curr: IGroup): IImageEntity;
}
