export const customEncodeURI = (str)=> {
    return encodeURIComponent(str)
        .replace(/%20/g, '+')  // Replace %20 with + for spaces
        .replace(/!/g, '%21')  // Encode !
        .replace(/'/g, '%27')  // Encode '
        .replace(/\(/g, '%28') // Encode (
        .replace(/\)/g, '%29') // Encode )
        .replace(/\*/g, '%2A') // Encode *
        .replace(/#/g, '%23')  // Encode #
        .replace(/\$/g, '%24')  // Encode $
        .replace(/&/g, '%26')  // Encode &
        .replace(/=/g, '%3D')  // Encode =
        .replace(/\?/g, '%3F') // Encode ?
        .replace(/\//g, '%2F') // Encode /
        .replace(/:/g, '%3A') // Encode :
        .replace(/;/g, '%3B')  // Encode ;
        .replace(/@/g, '%40')  // Encode @
        .replace(/,/g, '%2C'); // Encode ,
  }
export const customDecodeURI =(str) => {
    return decodeURIComponent(str
        .replace(/\+/g, '%20')  // Replace + with %20 for spaces
        .replace(/%21/g, '!')   // Decode !
        .replace(/%27/g, "'")   // Decode '
        .replace(/%28/g, '(')  // Decode (
        .replace(/%29/g, ')')   // Decode )
        .replace(/%2A/g, '*')  // Decode *
        .replace(/%23/g, '#')  // Decode #
        .replace(/%24/g, '$')  // Decode $
        .replace(/%26/g, '&')  // Decode &
        .replace(/%3D/g, '=')  // Decode =
        .replace(/%3F/g, '?')  // Decode ?
        .replace(/%2F/g, '/')  // Decode /
        .replace(/%3A/g, ':')  // Decode :
        .replace(/%3B/g, ';')  // Decode ;
        .replace(/%40/g, '@')  // Decode @
        .replace(/%2C/g, ',')); // Decode ,
  }