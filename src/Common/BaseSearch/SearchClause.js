// function onlyUnique(value, index, self) {
//   return self.indexOf((another) => another.value === value.value) === index;
// }

class SearchClause {
  constructor({
    name,
    value,
    multiple,
    options,
    getOptionValue,
    getOptionLabel,
    noOptions,
    optionsMap,
  }) {
    this.name = name;
    this.value = value;
    this.multiple = multiple || false;
    this.getOptionValue = getOptionValue;
    this.getOptionLabel = getOptionLabel;
    this.noOptions = noOptions || false;
    this.options = options;
    this.optionsMap = optionsMap;
  }
}

export default SearchClause;
