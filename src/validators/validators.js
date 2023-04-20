 export const requiredField= value =>{ // валидаторы нужны для нахождения ошибки в формах
    if(value) return undefined
    return "Full field"
 }

 export const maxLengthCreator=max => value=> value.length>max ? `max length is${max}` : undefined
 export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)