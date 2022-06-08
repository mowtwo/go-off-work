export interface IErrorResponse {
  type: 'error';
  message: string;
}

export interface IResultResponse<T extends {} = Record<string, any>> {
  type: 'success';
  data: T;
  message: string;
}

export type IResponse<T extends {} = Record<string, any>> = IErrorResponse | IResultResponse<T>;

export type ChineseZodiac =
  | '鼠'
  | '牛'
  | '虎'
  | '兔'
  | '龙'
  | '蛇'
  | '马'
  | '羊'
  | '猴'
  | '鸡'
  | '狗'
  | '猪';

export type Constellation =
  | '白羊座'
  | '金牛座'
  | '双子座'
  | '巨蟹座'
  | '狮子座'
  | '处女座'
  | '天秤座'
  | '天蝎座'
  | '射手座'
  | '摩羯座'
  | '水瓶座'
  | '双鱼座';

export type ICurrentResponse = IResponse<{
  avoid: string;
  chineseZodiac: ChineseZodiac;
  constellation: Constellation;
  date: string;
  dayOfYear: number
  indexWorkDayOfMonth: number;
  lunarCalendar: string;
  solarTerms: string;
  suit: string;
  type: 0 | 1 | 2;
  typeDesc: string;
  weekDay: number;
  weekOfYear: number;
  yearTips: string;
}>