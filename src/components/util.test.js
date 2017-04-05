
import {isNumeric} from './util';

//noinspection JSUnresolvedFunction
it('test isNumeric', () => {
    expect(isNumeric('1')).toBeTruthy();
    expect(isNumeric('1.2')).toBeTruthy();
    expect(isNumeric('-1')).toBeTruthy();
    expect(isNumeric('0')).toBeTruthy();
    expect(isNumeric('0.55')).toBeTruthy();
    expect(isNumeric('.5')).toBeTruthy();

    expect(isNumeric(1)).toBeTruthy();
    expect(isNumeric(-1)).toBeTruthy();
    expect(isNumeric(-1.2)).toBeTruthy();
    expect(isNumeric(2.23)).toBeTruthy();
    expect(isNumeric(0)).toBeTruthy();

    expect(isNumeric('')).toBeFalsy();
    expect(isNumeric('hello')).toBeFalsy();
    expect(isNumeric('1.2.3.4')).toBeFalsy();
    expect(isNumeric('#FFFFFF')).toBeFalsy();
    expect(isNumeric('9,00.00')).toBeFalsy();

    //Hexidecimal
    expect(isNumeric('0x23')).toBeTruthy();

});

it('test rect no intersection ABOVE', () => {

});

it('test rect no intersection BELOW', () => {

});

it('test rect no intersection LEFT', () => {

});

it('test rect no intersection RIGHT', () => {

});

it('test rect intersection RIGHT EDGE', () => {

});

it('test rect intersection LEFT EDGE', () => {

});

it('test rect intersection TOP EDGE', () => {

});

it('test rect intersection BOTTOM EDGE', () => {

});

it('test rect intersection ALL EDGES', () => {

});