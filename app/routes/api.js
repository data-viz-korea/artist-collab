var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/data', function(req, res, next) {
  const user = {
    "nodes": [
      {
        "id": "287",
        "level": 1,
        "aiScore": 0.5021412166132017,
        "support": 0.9816443594646271
      },
      {
        "id": "722",
        "level": 1,
        "aiScore": 0.5053774019666223,
        "support": 0.9648183556405354
      },
      {
        "id": "287-722",
        "level": 2,
        "aiScore": 0.5056444635557789,
        "support": 0.9640535372848948
      }
    ],
    "links": [
      {
        "source": "287",
        "target": "287-722",
        "value": 1
      },
      {
        "source": "287",
        "target": "722",
        "value": 1
      },
      {
        "source": "722",
        "target": "287-722",
        "value": 1
      }
    ]
  }


  res.end(JSON.stringify(user));
});

module.exports = router;
