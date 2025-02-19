import * as helpers from '../ParseHelpers';
export default class Lwpolyline {
    ForEntityName = 'LWPOLYLINE';
    parseEntity(scanner, curr) {
        const entity = { type: curr.value, vertices: [] };
        let numberOfVertices = 0;
        curr = scanner.next();
        while (!scanner.isEOF()) {
            if (curr.code === 0)
                break;
            switch (curr.code) {
                case 38:
                    entity.elevation = curr.value;
                    break;
                case 39:
                    entity.depth = curr.value;
                    break;
                case 70: // 1 = Closed shape, 128 = plinegen?, 0 = default
                    entity.shape = ((curr.value & 1) === 1);
                    entity.hasContinuousLinetypePattern = ((curr.value & 128) === 128);
                    break;
                case 90:
                    numberOfVertices = curr.value;
                    break;
                case 10: // X coordinate of point
                    entity.vertices = parseLWPolylineVertices(numberOfVertices, scanner);
                    break;
                case 43:
                    if (curr.value !== 0)
                        entity.width = curr.value;
                    break;
                case 210:
                    entity.extrusionDirectionX = curr.value;
                    break;
                case 220:
                    entity.extrusionDirectionY = curr.value;
                    break;
                case 230:
                    entity.extrusionDirectionZ = curr.value;
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
function parseLWPolylineVertices(n, scanner) {
    if (!n || n <= 0)
        throw Error('n must be greater than 0 verticies');
    const vertices = [];
    let vertexIsStarted = false;
    let vertexIsFinished = false;
    let curr = scanner.lastReadGroup;
    for (let i = 0; i < n; i++) {
        const vertex = {};
        while (!scanner.isEOF()) {
            if (curr.code === 0 || vertexIsFinished)
                break;
            switch (curr.code) {
                case 10: // X
                    if (vertexIsStarted) {
                        vertexIsFinished = true;
                        continue;
                    }
                    vertex.x = curr.value;
                    vertexIsStarted = true;
                    break;
                case 20: // Y
                    vertex.y = curr.value;
                    break;
                case 30: // Z
                    vertex.z = curr.value;
                    break;
                case 40: // start width
                    vertex.startWidth = curr.value;
                    break;
                case 41: // end width
                    vertex.endWidth = curr.value;
                    break;
                case 42: // bulge
                    if (curr.value != 0)
                        vertex.bulge = curr.value;
                    break;
                default:
                    // if we do not hit known code return vertices.  Code might belong to entity
                    scanner.rewind();
                    if (vertexIsStarted) {
                        vertices.push(vertex);
                    }
                    scanner.rewind();
                    return vertices;
            }
            curr = scanner.next();
        }
        // See https://groups.google.com/forum/#!topic/comp.cad.autocad/9gn8s5O_w6E
        vertices.push(vertex);
        vertexIsStarted = false;
        vertexIsFinished = false;
    }
    scanner.rewind();
    return vertices;
}
