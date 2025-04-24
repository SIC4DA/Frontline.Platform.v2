interface NumberFormat {
  value: number;
  format: "kilo" | "million" | "billion";
}

export function formatLargeNumber(num: number): NumberFormat {
  if (num >= 1000000000) {
    const value = Number((num / 1000000000).toFixed(1));
    return {
      value,
      format: "billion",
    };
  }

  if (num >= 1000000) {
    const value = Number((num / 1000000).toFixed(1));
    return {
      value,
      format: "million",
    };
  }

  if (num >= 1000) {
    const value = Number((num / 1000).toFixed(0));
    return {
      value,
      format: "kilo",
    };
  }

  return {
    value: num,
    format: "kilo",
  };
}
