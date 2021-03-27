const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './../.env'});
}

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ADDRESS_API_KEY = process.env.ADDRESS_API_KEY
const PORT = process.env.PORT || 3000;

function get_addresses(postcode) {
    return new Promise(resolve => {
        fetch(`https://api.getAddress.io/find/${postcode}?api-key=${ADDRESS_API_KEY}`)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => {
                console.error(err)
                resolve({'Message': 'Sorry something went wrong'})
            })
    })
}

app.get('/addresses/:postcode', async (req, res) => {
    const postcode = req.params.postcode;
    const addresses = await get_addresses(postcode)

    if (addresses['Message']) {
        return res.status(200).send({error: addresses['Message'] });
    }

    res.status(200).send({success: addresses});
});

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));