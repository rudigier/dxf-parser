import * as helpers from '../ParseHelpers';
export default class Mtext {
    ForEntityName = 'MTEXT';
    parseEntity(scanner, curr) {
        const entity = { type: curr.value };
        curr = scanner.next();
        while (!scanner.isEOF()) {
            if (curr.code === 0)
                break;
            switch (curr.code) {
                case 3:
                    entity.text ? entity.text += curr.value : entity.text = curr.value;
                    break;
                case 1:
                    entity.text ? entity.text += curr.value : entity.text = curr.value;
                    break;
                case 10:
                    entity.position = helpers.parsePoint(scanner);
                    break;
                case 11:
                    entity.directionVector = helpers.parsePoint(scanner);
                    break;
                case 40:
                    //Note: this is the text height
                    entity.height = curr.value;
                    break;
                case 41:
                    entity.width = curr.value;
                    break;
                case 50:
                    entity.rotation = curr.value;
                    break;
                case 71:
                    entity.attachmentPoint = curr.value;
                    break;
                case 72:
                    entity.drawingDirection = curr.value;
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
