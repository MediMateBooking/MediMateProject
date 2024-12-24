function BMICalculator(height,weight){

    const heightInMeters = parseInt(height, 10) / 100;
    const weightInKg = parseInt(weight, 10);

    // Check if height or weight is invalid
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
        throw new Error("Invalid height or weight values provided.");
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    return bmi.toFixed(2);
}

module.exports = {
    BMICalculator : BMICalculator
}