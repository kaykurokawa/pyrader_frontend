export const MICRO = Math.pow(10,6);
export const MILLI = Math.pow(10,3);
export const HUNDREDMIL = Math.pow(10,8);
export const TENTHOUSAND = Math.pow(10,4);
export const conversions = {"USD": HUNDREDMIL, "BTC" : HUNDREDMIL, "DOGE" : HUNDREDMIL, 
"LTC" : HUNDREDMIL, "ETH" : HUNDREDMIL, "EUR" : HUNDREDMIL, "SGD" : HUNDREDMIL, "KRW" : TENTHOUSAND};
export const WEB_URL = "http://159.65.167.149:8080";
export const REST_URL = "http://159.65.167.149:8888";
export var NOTIFY_URL;
export const STANDARD_PARAMETER = '?typeof=standard';
export const SAVE_PARAMETER = '?typeof=saved';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    NOTIFY_URL = 'http://localhost:8888/notify';
} else {
    NOTIFY_URL = REST_URL;    
}