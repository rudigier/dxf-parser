import * as helpers from '../ParseHelpers';
export default class Line {
    ForEntityName = 'IMAGE';
    parseEntity(scanner, curr) {
        const entity = { type: curr.value, clipBoundary: [] };
        curr = scanner.next();
        while (!scanner.isEOF()) {
            if (curr.code === 0)
                break;
            console.log(curr);
            switch (curr.code) {
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
                    entity.imgWidth = curr.value;
                    break;
                case 23:
                    entity.imgHeight = curr.value;
                    break;
                case 14:
                    entity.clipBoundary.push(helpers.parsePoint(scanner));
                    break;
                case 280:
                    entity.isClipped = curr.value === 1;
                    break;
                default:
                    helpers.checkCommonEntityProperties(entity, curr, scanner);
                    break;
            }
            curr = scanner.next();
        }
        console.log(JSON.stringify(entity), entity);
        return entity;
    }
}
