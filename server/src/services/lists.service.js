const List = require("../models/List");
List.paginate().then({});

exports.createList = async (list) => {
  const newList = new List(list);
  const savedList = await newList.save();

  return savedList;
}

exports.deleteList = async (listId) => {
  const deletedList = await List.findByIdAndDelete(listId);

  return deletedList;
}

exports.getListByTypeQuery = async (typeQuery, pageLimit, pageNumber) => {
  const options = {
    page: pageNumber,
    limit: pageLimit,
    sort: { title: 1 }
  };

  const query = {
    type: typeQuery
  }

  var paginate;

  await List.paginate(query, options, function (err, result) {
    paginate = result;
  })

  return paginate;
}

exports.getListByTypeQueryAndGenreQuery = async (typeQuery, genreQuery, pageLimit, pageNumber) => {
  const options = {
    page: pageNumber,
    limit: pageLimit,
    sort: { title: 1 }
  };

  const query = {
    type: typeQuery,
    genre: genreQuery
  }

  var paginate;

  await List.paginate(query, options, function (err, result) {
    paginate = result;
  })

  return paginate;
}

exports.getAllList = async () => {
  const list = await List.find();

  return list;
}

exports.updateList = async (listId, list) => {
  const updatedList = await List.findByIdAndUpdate(
    listId,
    {
      $set: list,
    },
    { new: true }
  );

  return updatedList;
}

exports.getSingleList = async (listId) => {
  const list = await List.findById(listId);

  return list;
}

exports.getHomePageList = async (pageLimit, pageNumber) => {
  const options = {
    page: pageNumber,
    limit: pageLimit,
    sort: { title: 1 }
  };

  const query = {
    view: 'all'
  }

  var paginate;

  await List.paginate(query, options, function (err, result) {
    paginate = result;
  })

  return paginate;
}

exports.getListByUserId = async (userId, pageNumber, pageLimit) => {
  const options = {
    page: pageNumber,
    limit: pageLimit
  };

  const query = {
    owner: userId,
    view: {
      "$ne": "all"
    }
  }

  var paginate;

  await List.paginate(query, options, function (err, result) {
    paginate = result;
  })

  return paginate;
}