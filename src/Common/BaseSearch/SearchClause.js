function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

class SearchClause {
  constructor(name, value, values, multiple) {
    this.name = name;
    this.value = value;
    this.values = values.filter(onlyUnique);
    this.multiple = multiple;
  }

  onChange(newValue) {
    this.value = newValue;
    // this.values = this.values.filter((value) =>
    //   value.toUpperCase().startsWith(newValue.toUpperCase())
    // );
  }
}

export default SearchClause;
