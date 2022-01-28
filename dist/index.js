import DxfParser from './DxfParser';
export { default as DxfParser } from './DxfParser';
export default function parse(source) {
    return new DxfParser().parse(source);
}
