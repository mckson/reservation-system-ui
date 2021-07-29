function defaultDisplayValue(value) {
  return value?.toString();
}

class SearchRange {
  constructor(name, value1, value2, displayValue, min, max) {
    this.name = name;
    this.value = [value1, value2];
    this.displayValue = displayValue || defaultDisplayValue;
    this.min = min || 0;
    this.max = max || 100;
  }
}

export default SearchRange;
