class SearchOption {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  onChange(newValue) {
    this.value = newValue;
  }
}

export default SearchOption;
