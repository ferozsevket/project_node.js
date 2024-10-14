function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];
    
    let totalTarget = 0;
  
    // Loop through the months between the start and end dates
    let currentDate = new Date(start);
    
    while (currentDate <= end) {
      // Get the current month and year
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      
      // Calculate the first and last day of the month
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0); // Last day of the month
      
      // Initialize counts for the month
      let validDaysCount = 0;
      let workedDaysCount = 0;
      
      // Loop through each day of the current month
      for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
        const dayOfWeek = day.getDay();
        
        // Exclude Fridays (5)
        if (dayOfWeek !== 5) {
          validDaysCount++;
          
          // Count as worked if it is in the range
          if (day >= start && day <= end) {
            workedDaysCount++;
          }
        }
      }
      
      // Store counts and calculate target for the month
      daysExcludingFridays.push(validDaysCount);
      daysWorkedExcludingFridays.push(workedDaysCount);
      
      // Proportional target calculation
      const monthlyTarget = (validDaysCount > 0) ? (totalAnnualTarget / validDaysCount) * workedDaysCount : 0;
      monthlyTargets.push(monthlyTarget);
      
      // Update total target
      totalTarget += monthlyTarget;
      
      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  
    return {
      daysExcludingFridays,
      daysWorkedExcludingFridays,
      monthlyTargets,
      totalTarget,
    };
  }
  
  // Example usage
  const result = calculateTotalTarget('2024-01-01', '2024-03-31', 5220);
  console.log(result);