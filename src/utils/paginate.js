function paginate(items, page = 1, limit = 5) {
  let currentPage = parseInt(page, 10) || 1;
  let currentLimit = parseInt(limit, 10) || 5;

  if (currentPage < 1) currentPage = 1;
  if (currentLimit < 1) currentLimit = 5;
  if (currentLimit > 100) currentLimit = 100;

  const total = items.length;
  const totalPages = Math.ceil(total / currentLimit) || 1;
  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = startIndex + currentLimit;

  return {
    data: items.slice(startIndex, endIndex),
    meta: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages,
    },
  };
}

module.exports = paginate;
