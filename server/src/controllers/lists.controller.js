const listService = require("../services/lists.service");

exports.createList = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const savedList = await listService.createList(req.body);
      res.success({
        result: {
          data: savedList
        }
      })
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You are not allowed!" });
  }
}

exports.deleteList = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const deletedList = await listService.deleteList(req.params.id);
      res.success({
        result: {
          data: deletedList
        }
      })
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You are not allowed!" });
  }
}

exports.getAllListAdmin = async (req, res, next) => {
  try {
    const list = await listService.getAllList();
    res.success({
      result: {
        data: list
      }
    })
  } catch (error) {
    next(error)
  }
}

exports.getAllList = async (req, res, next) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];

  if (!req.query.pageNumber) res.error({
    err: "No page number"
  });
  else {
    const pageLimit = req.query.pageLimit ? req.query.pageLimit : 10;
    const pageNumber = req.query.pageNumber;
    try {
      if (typeQuery) {
        var paginate;
        if (genreQuery) {
          paginate = await listService.getListByTypeQueryAndGenreQuery(typeQuery, genreQuery, pageLimit, pageNumber);
        } else {
          paginate = await listService.getListByTypeQuery(typeQuery, pageLimit, pageNumber);
        }
        res.success({
          result: {
            data: paginate.docs,
            totalPages: paginate.totalPages,
            totalDocs: paginate.totalDocs,
            currentPage: paginate.page,
            hasNextPage: paginate.hasNextPage,
            hasPrevPage: paginate.hasPrevPage,
          }
        })
      } else {
        list = await listService.getAllList();
        res.success({
          result: {
            data: list
          }
        })
      }
    } catch (err) {
      next(err);
    }
  }
}

exports.updateList = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await listService.updateList(req.params.id, req.body);
      res.success({
        result: {
          data: updatedList
        }
      });
    } catch (err) {
      next(err);
    }
  } else {
    res.forbidden({ err: "You are not allowed!" });
  }
}

exports.getList = async (req, res, next) => {
  try {
    const list = await listService.getSingleList(req.params.id);
    res.success({
      result: {
        data: list,
        total: list.length
      }
    });
  } catch (err) {
    next(err);
  }
}

exports.getHomePageList = async (req, res, next) => {
  if (!req.query.pageNumber) res.error({
    err: "No page number"
  });
  else {
    const pageLimit = req.query.pageLimit ? req.query.pageLimit : 10;
    const pageNumber = req.query.pageNumber;

    try {
      const paginate = await listService.getHomePageList(pageLimit, pageNumber);
      res.success({
        result: {
          data: paginate.docs,
          totalPages: paginate.totalPages,
          totalDocs: paginate.totalDocs,
          currentPage: paginate.page,
          hasNextPage: paginate.hasNextPage,
          hasPrevPage: paginate.hasPrevPage,
        }
      })
    } catch (err) {
      next(err);
    }
  }
}

exports.getListByUser = async (req, res, next) => {
  if (req.query.userId && req.query.pageNumber) {
    const userId = req.query.userId;
    const pageNumber = req.query.pageNumber;
    const pageLimit = req.query.pageLimit ? req.query.pageLimit : 5;
    try {
      const paginate = await listService.getListByUserId(userId, pageNumber, pageLimit);

      res.success({
        result: {
          data: paginate.docs,
          totalPages: paginate.totalPages,
          totalDocs: paginate.totalDocs,
          currentPage: paginate.page,
          hasNextPage: paginate.hasNextPage,
          hasPrevPage: paginate.hasPrevPage,
        }
      })
    } catch (error) {
      next(error)
    }
  } else res.error({
    err: "No User Id"
  });
}