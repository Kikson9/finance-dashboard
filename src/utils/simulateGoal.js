export function simulateGoal({ currentAmount, targetAmount, deadline, monthlySavingsCapacity }) {
    const remaining = targetAmount - currentAmount;
  
    if (remaining <= 0) {
      return { status: "complete", monthsToGoal: 0, projectedDate: null, requiredMonthly: 0 };
    }
  
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const monthsUntilDeadline = Math.max(
      (deadlineDate.getFullYear() - today.getFullYear()) * 12 +
        (deadlineDate.getMonth() - today.getMonth()),
      0
    );
  
    const requiredMonthly = monthsUntilDeadline > 0
      ? Math.ceil(remaining / monthsUntilDeadline)
      : remaining;
  
    if (monthlySavingsCapacity <= 0) {
      return {
        status: "stalled",
        monthsToGoal: null,
        projectedDate: null,
        requiredMonthly,
      };
    }
  
    const monthsToGoal = Math.ceil(remaining / monthlySavingsCapacity);
    const projectedDate = new Date(today.getFullYear(), today.getMonth() + monthsToGoal, 1);
  
    const status = monthsToGoal <= monthsUntilDeadline ? "on-pace" : "behind";
  
    return { status, monthsToGoal, projectedDate, requiredMonthly };
  }