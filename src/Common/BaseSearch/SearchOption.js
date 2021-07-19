class SearchOption {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  onChange(newValue) {
    this.value = newValue;
    // this.values = this.values.filter((value) =>
    //   value.toUpperCase().startsWith(newValue.toUpperCase())
    // );
  }
}

export default SearchOption;
