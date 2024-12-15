function generateRandomPassword() {
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|<>?";
    
    let password = [
      lowerCase[Math.floor(Math.random() * lowerCase.length)],
      upperCase[Math.floor(Math.random() * upperCase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)],
    ];
  
    const allChars = lowerCase + upperCase + numbers + specialChars;
    for (let i = 0; i < 2; i++) {
      password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }
  
    password = password.sort(() => Math.random() - 0.5);
  
    return password.join('');
  }

  module.exports = {
    generateRandomPassword : generateRandomPassword
  }