function generateRandomNumberString() {
    let numberString = "";
    
    for (let i = 0; i < 7; i++) {
      const randomDigit = Math.floor(Math.random() * 10); 
      numberString += randomDigit;
    }
    
    return numberString;
  }


  module.exports = {
    generateRandomNumberString: generateRandomNumberString
  }