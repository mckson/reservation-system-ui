// function onlyUnique(value, index, self) {
//   return self.indexOf((another) => another.value === value.value) === index;
// }

class SearchClause {
  constructor(name, value, values, multiple) {
    this.name = name;
    this.value = value;
    this.values = values;
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
