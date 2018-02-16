export const getCookies = () => document.cookie.split(";").reduce( (acc, val)=>{
        const keyValue =  val.split("=");
        acc[keyValue[0].trim()] = decodeURIComponent(keyValue[1]);
        return acc;
    } , {}
);