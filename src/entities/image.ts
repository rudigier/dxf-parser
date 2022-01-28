
import DxfArrayScanner, { IGroup } from '../DxfArrayScanner';
import * as helpers from '../ParseHelpers'
import IGeometry, { IEntity, IPoint } from './geomtry';

export interface IImageEntity extends IEntity{
	position: IPoint;
	uVector: number;
	vVector: number;
	imgWidth: number;
	imgHeight: number;
	clipBoundary: IPoint[];
	isClipped: boolean;
}

export default class Line implements IGeometry{
	public ForEntityName= 'IMAGE' as const;
	public parseEntity(scanner: DxfArrayScanner, curr: IGroup) {
		const entity = { type: curr.value, clipBoundary: [] as IPoint[] } as IImageEntity;
		curr = scanner.next();
		while(!scanner.isEOF()) {
				if(curr.code === 0) break;
				switch(curr.code) {
						case 10:
								entity.position = helpers.parsePoint(scanner);
								break;
						case 11:
								entity.uVector = helpers.parsePoint(scanner);
								break;
						case 12:
								entity.vVector = helpers.parsePoint(scanner);
								break;
						case 13:
								entity.imgWidth = curr.value as number;
								break;
						case 23:
								entity.imgHeight = curr.value as number;
								break;
						case 14:
								entity.clipBoundary.push(helpers.parsePoint(scanner));
								break;
						case 280:
								entity.isClipped = curr.value === 1
								break;
						default:
								helpers.checkCommonEntityProperties(entity, curr, scanner);
								break;
				}
				
				curr = scanner.next();
		}
		return entity;
	}
}
