
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