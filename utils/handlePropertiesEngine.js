const ENGINE_DB = process.env.ENGINE_DB;

const getProperties = () => {
  if (ENGINE_DB === "nosql") {
    return { id: "_id" };
  } else if (ENGINE_DB === "mysql") {
    return { id: "id" };
  }
};

module.exports = getProperties;
