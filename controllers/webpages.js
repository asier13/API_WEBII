const { matchedData } = require("express-validator");
const { modelWebpages } = require("../models");
const { handleError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;

//   SUBIR contenido via POST
const uploadContent = async (req, res) => {
  const { id } = req.params;

  const body = matchedData(req);

  try {
    const existingContent = await modelWebpages.findOne({ webpageId: id });
    if (existingContent) {
      return handleError(res, "WEBPAGE_ALREADY_EXISTS", 409);
    }
    const webpage = await modelWebpages.create(body);
    if (!webpage) {
      return handleError(res, "WEBPAGE_NOT_FOUND", 404);
    }
    res.send({ webpage });
  } catch (error) {
    handleError(res, "ERROR_UPLOAD_CONTENT");
  }
};

//   BUSCAR pagina web via GET
const getWebPage = async (req, res) => {
  try {
    const { id } = req.params;
    const webpage = await modelWebpages.findOne({ webpageId: id }); //busca por webpageId
    if (!webpage) {
      return handleError(res, "WEBPAGE_NOT_FOUND", 404);
    }
    res.send({ webpage });
  } catch (error) {
    handleError(res, "ERROR_GET_WEBPAGE");
  }
};

//   BUSCAR paginas web via GET
const getWebPages = async (req, res) => {
  try {
    const contents = await modelWebpages.find({});
    res.send({ contents });
  } catch (error) {
    handleError(res, "ERROR_GET_WEBPAGES");
  }
};
const getWebPagesByCity = async (req, res) => {
    const { city, sort } = req.params;
    try {
      let query = modelWebpages.find({ city }).lean();
      if (sort) {
        query = query
          .addFields({
            averageScore: { $avg: "$nonEditable.scoring" },
          })
          .sort({ averageScore: -1, title: 1 })
          .project({ averageScore: 0 });
      }
      const webpages = await query.exec();
      res.send({ webpages });
    } catch (error) {
      handleError(res, "ERROR_GET_WEBPAGES_CITY");
    }
  };
  
//   BUSCAR paginas web por actividad via GET
const getWebPagesByActivity = async (req, res) => {
  const { activity, sort } = req.params; //parametros URL
  try {
    let webpages = await modelWebpages.find({ activity });
    if (sort) {
      webpages = webpages.sort((a, b) => {
        return b.nonEditable.scoring - a.nonEditable.scoring;
      });
    }
    res.send({ webpages });
  } catch (error) {
    handleError(res, "ERROR_GET_WEBPAGES_ACTIVITY");
  }
};

//   BUSCAR paginas web por ciudad y actividad via GET
const getWebPagesByCityAndActivity = async (req, res) => {
  const { city, activity, sort } = req.params;
  try {
    let webpages = await modelWebpages.find({ city, activity });

    if (sort) {
      webpages = webpages.sort((a, b) => {
        return b.nonEditable.scoring - a.nonEditable.scoring;
      });
    }

    res.send({ webpages });
  } catch (error) {
    handleError(res, "ERROR_GET_WEBPAGES_CITY_ACTIVITY");
  }
};


const updateScoring = async (req, res) => {
    const { id } = req.params;
    const { scoring, reviews } = req.body.nonEditable;
  
    if(!scoring || !reviews){
      return handleError(res, "MISSING_FIELDS");
    }
  
    try {
      const updatedContent = await modelWebpages.findOneAndUpdate(
        { webpageId: id },
        {
          $push: {
            "nonEditable.scoring": scoring,
            "nonEditable.reviews": reviews,
          },
          $inc: {
            "nonEditable.numScores": 1,
          },
        },
        { new: true }
      );
  
      if (!updatedContent) {
        return handleError(res, "CONTENT_NOT_FOUND", 404);
      }
  
      res.send(updatedContent);
    } catch (error) {
      handleError(res, "ERROR_UPDATE_CONTENT");
    }
  };
  

  const uploadPhoto = async (req, res) => {
    const { file } = req;
    const { id } = req.params;
  
    if(!file) {
      return handleError(res, "MISSING_FILE");
    }
  
    const newPhoto = {
      url: `${PUBLIC_URL}/${file.filename}`,
      filename: file.filename,
    };
  
    try {
      const updatedContent = await modelWebpages.findOneAndUpdate(
        { webpageId: id },
        { $push: { photos: newPhoto } },
        { new: true }
      );
  
      if (!updatedContent) {
        return handleError(res, "CONTENT_NOT_FOUND", 404);
      }
  
      res.send(updatedContent);
    } catch (error) {
      handleError(res, "ERROR_UPDATE_PHOTO_INFO");
    }
  };
  

  const uploadText = async (req, res) => {
    const { texts } = req.body;
    const { id } = req.params;
  
    if(!texts){
      return handleError(res, "MISSING_TEXTS");
    }
  
    try {
      const updatedContent = await modelWebpages.findOneAndUpdate(
        { webpageId: id },
        { $push: { texts: texts } },
        { new: true }
      );
  
      if (!updatedContent) {
        return handleError(res, "CONTENT_NOT_FOUND", 404);
      }
  
      res.send(updatedContent);
    } catch (error) {
      handleError(res, "ERROR_UPDATE_TEXT");
    }
  };
  
//   BORRAR pagina web via DELETE
const deleteWebPage = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await modelWebpages.findOneAndDelete({ webpageId: id });
    res.send(data);
  } catch (err) {
    console.log(err);
    handleError(res, "ERROR_DELETE_WEBPAGE");
  }
};

module.exports = {
  uploadContent, getWebPage, getWebPages, getWebPagesByCity, getWebPagesByActivity, getWebPagesByCityAndActivity, deleteWebPage, updateScoring, uploadPhoto, uploadText};