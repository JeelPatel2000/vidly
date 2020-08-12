import _ from "lodash";

export default function pagination(items, pageSize, pageNumber) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex, startIndex + pageSize)
    .value();
}
