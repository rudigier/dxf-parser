import DxfArrayScanner, { IGroup } from '../DxfArrayScanner';
import IGeometry, { IEntity, IPoint } from './geomtry';
export interface IVertexEntity extends IEntity, IPoint {
    bulge: number;
    curveFittingVertex: boolean;
    curveFitTangent: boolean;
    splineVertex: boolean;
    splineControlPoint: boolean;
    threeDPolylineVertex: boolean;
    threeDPolylineMesh: boolean;
    polyfaceMeshVertex: boolean;
    faceA: number;
    faceB: number;
    faceC: number;
    faceD: number;
}
export default class Vertex implements IGeometry {
    ForEntityName: "VERTEX";
    parseEntity(scanner: DxfArrayScanner, curr: IGroup): IVertexEntity;
}
