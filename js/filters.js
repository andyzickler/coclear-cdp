function createFilters(data, g) {
  let companySelect = d3.select('#select-company');
  let industrySelect = d3.select('#select-industry');
  let yearSelect = d3.select('#select-year');

  companies = getUniqueValues(data, 'company');
  industries = getUniqueValues(data, 'industry');
  years = getUniqueValues(data, 'year');

  populateSelect(companySelect, companies);
  populateSelect(industrySelect, industries, ' Industry');
  populateSelect(yearSelect, years);
}

// Takes an array of objects and a key to map to.
// Returns an array of unique values
function getUniqueValues(data, key) {
 return data.map(d => d[key]).filter((ele, pos, arr) => {
   return arr.indexOf(ele) === pos;
 }).sort();
}

function populateSelect(select, data, append) {
  append = append || '';
  select.selectAll('option')
        .data(data).enter()
        .append('option')
        .text(function(d) { return d + append; });
}