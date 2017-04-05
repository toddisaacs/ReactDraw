
import {isNumeric, rectIntersect} from './util';

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

let rectA = {
  x: 100,
  y: 100,
  width: 40,
  height: 40
};

let rectB = {
  x: 100,
  y: 100,
  width: 20,
  height: 20
};

describe('test rectangle intersection', () => {

  beforeEach(() => {
    //reset position back
    rectA.x =  100;
    rectA.y = 100;
    rectB.x = 100;
    rectB.y = 100;
  });

  it('test rect no intersection ABOVE', () => {
    //move B completely ABOVE A
    rectB.y = 0;
    expect(rectIntersect(rectA, rectB)).toBeFalsy();
  });

  it('test rect no intersection BELOW', () => {
    //move B completely BELOW A
    rectB.y = 200;
    expect(rectIntersect(rectA, rectB)).toBeFalsy();
  });

  it('test rect no intersection LEFT', () => {
    //move B completely LEFT of A
    rectB.x = 0;
    expect(rectIntersect(rectA, rectB)).toBeFalsy();
  });

  it('test rect no intersection RIGHT', () => {
    //move B completely RIGHT of A
    rectB.x = 200;
    expect(rectIntersect(rectA, rectB)).toBeFalsy();
  });

  it('test rect intersection RIGHT EDGE over ', () => {
    //move B RIGHT edge over A
    rectB.x = 85; //right edge at 105
    expect(rectIntersect(rectA, rectB)).toBeTruthy();
  });

  it('test rect intersection LEFT EDGE over', () => {
    //move B LEFT edge over A
    rectB.x = 135; //right edge at 105
    expect(rectIntersect(rectA, rectB)).toBeTruthy();
  });

  it('test rect intersection TOP EDGE over', () => {
    //move B TOP edge over A
    rectB.y = 135; //right edge at 105
    expect(rectIntersect(rectA, rectB)).toBeTruthy();
  });

  it('test rect intersection BOTTOM EDGE', () => {
    //move B BOTTOM edge over A
    rectB.y = 85; //right edge at 105
    expect(rectIntersect(rectA, rectB)).toBeTruthy();
  });

  it('test rect intersection ALL EDGES', () => {
      rectB.x = 105;
      rectB.y = 105;
      expect(rectIntersect(rectA, rectB)).toBeTruthy();
  });

  it('test rect intersection left corver over', () => {
    rectB.x = 139;
    rectB.y = 139;
    expect(rectIntersect(rectA, rectB)).toBeTruthy();
  });

});
