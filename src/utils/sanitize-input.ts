export const sanitizeInput = (input: AnyObject) => {
  return Object.fromEntries(
    Object.entries(input).filter(
      ([_, value]) => value !== undefined && value !== null && value !== '',
    ),
  );
};
